const Koa = require('koa');
const static = require('koa-static')
const cors = require('@koa/cors');
const bodyParser = require('koa-body-parser');
const mongoDriver = require('koa-mongo-driver')
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

let {Console} = require('console')
let cs = new Console(process.stdout, process.stderr)

var getStackTrace = function () {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};
var log = console.log;
console.log = function () {
    var stack = getStackTrace() || ""
    var matchResult = stack.match(/(?<=\().*?(?=\))/g) || []
    // var line = matchResult[1] || ""
    let line = ''
    if (matchResult) {
        let dirname = matchResult[0].replace(/\:\d+\:\d+/gi, '')
        // cs.log(dirname)
        let arr = dirname.split(/\\|\//)
        // cs.log(arr)
        let fileName = arr[arr.length - 1]
        // cs.log(fileName)
        for (let i = 0, len = matchResult.length; i < len; i++) {
            // cs.log(matchResult[i])
            if (matchResult[i].indexOf(fileName) > -1) line = matchResult[i]
        }
    }
    for (var i in arguments) {}
    if (typeof arguments[i] == 'object') {
        arguments[i] = JSON.stringify(arguments[i])
    }
    arguments[i] += ' ---- ' + line.replace("(", "").replace(")", "")
    log.apply(console, arguments)
};

function makeResult(data, opt) {
    let ret = {data: data, code: '1000', message: 'success'};
    Object.assign(ret, opt)
    return ret
}

io.on('connection', (socket) => {
    console.log('connection');
    socket.on('login', (data) => {
        let MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://127.0.0.1:27017/chat', {
            useNewUrlParser: true,
            auth: {
                user: 'admin',
                password: 'admin'
            },
            authSource: 'admin',
            authMechanism: 'DEFAULT'
        }).then(async function (client) {
            let coll = await client.db().collection('user')
            let result = await coll.find(data, {
                projection: {
                    userName: 1
                }
            }).toArray()
            if (result.length > 0) {
                console.log('连接成功')

                let ret = makeResult(result[0], {message:'连接成功'});

                // 用户初始化
                socket.emit('init-login', ret)

                // 获取在线用户
                let users = await coll.find({userName:{$ne:data.userName}}, {projection:{userName:1}}).toArray()
                cs.log(users)
                socket.emit('sync-user', makeResult(users))

                // 发送用户上线通知
                ret.message = '用户上线'
                socket.broadcast.emit('user-online', ret)
            } else {
                console.log('用户不存在')
                io.close()
            }
        }).catch(function () {
            console.log('database connection error')
        }).then(function () {
            // 接收转发消息
            socket.on('message', data => {
                socket.emit('message', data)
            })
        })
        // console.log(data, new Date())
        // let res = ctx.mongo.db().find(data).toArray()
        // if (res.length <= 0) io.close(() => {console.log('socket closed')})x
    })
})

app.use(cors())
app.use(static('dist'), {
    extensions: ['html', 'css', 'js', 'img', 'png']
})
app.use(bodyParser())
app.use(mongoDriver({
    url: '127.0.0.1',
    port: 27017,
    databaseName: 'chat'
}, {
    auth: {
        user: 'admin',
        password: 'admin'
    },
    authSource: 'admin',
    authMechanism: 'DEFAULT'
}))

let controller = require('./back-end/controller.js')
app.use(controller());

server.listen(3000, () => {
    console.log('listening on 3000')
});