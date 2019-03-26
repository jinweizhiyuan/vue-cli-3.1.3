const Koa = require('koa');
const static = require('koa-static')
const cors = require('@koa/cors');
const bodyParser = require('koa-body-parser');
const mongoDriver = require('koa-mongo-driver')
const session = require('koa-session')
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server, {
    // origins: '*'
});

const { makeResult } = require('./back-end/utils/common')
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 'session',
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
let sessionMiddleware = session(CONFIG, app)

let {Console} = require('console')
let cs = new Console(process.stdout, process.stderr)

// var getStackTrace = function () {
//     var obj = {};
//     Error.captureStackTrace(obj, getStackTrace);
//     return obj.stack;
// };
// var log = console.log;
// console.log = function () {
//     var stack = getStackTrace() || ""
//     var matchResult = stack.match(/(?<=\().*?(?=\))/g) || []
//     // var line = matchResult[1] || ""
//     let line = ''
//     if (matchResult) {
//         let dirname = matchResult[0].replace(/\:\d+\:\d+/gi, '')
//         // cs.log(dirname)
//         let arr = dirname.split(/\\|\//)
//         // cs.log(arr)
//         let fileName = arr[arr.length - 1]
//         // cs.log(fileName)
//         for (let i = 0, len = matchResult.length; i < len; i++) {
//             // cs.log(matchResult[i])
//             if (matchResult[i].indexOf(fileName) > -1) line = matchResult[i]
//         }
//     }
//     for (var i in arguments) {}
//     if (typeof arguments[i] == 'object') {
//         arguments[i] = JSON.stringify(arguments[i])
//     }
//     arguments[i] += ' ---- ' + line.replace("(", "").replace(")", "")
//     log.apply(console, arguments)
// };


let socketMap = global.socketMap = new Map()
let MongoClient = require('mongodb').MongoClient;
let mongodbConfig = ['mongodb://127.0.0.1:27017/chat', {
    useNewUrlParser: true,
    auth: {
        user: 'admin',
        password: 'admin'
    },
    authSource: 'admin',
    authMechanism: 'DEFAULT'
}]
io.on('connection', (socket) => {
    console.log('connection')

    socket.on('login', (data, callback) => {
        MongoClient.connect(...mongodbConfig).then(async function (client) {
            // socket.request.headers.cookie
            // app
            let userColt = await client.db().collection('user'),
                groupUserClct = await client.db().collection('userMapGroup')
            
            let result = await userColt.findOne(data, {
                projection: {
                    userName: 1,
                    portrait: 1,
                    _id: 1
                }
            })
            
            if (result) {
                console.log('连接成功')

                // socket 实例和用户名称映
                socketMap.set(result._id.toString(), {socketId: socket.id, socket: socket})

                // 用户标记为在线
                userColt.updateOne({_id:result._id}, {$set:{online:1}})

                let ret = makeResult(result, {message:'连接成功'});

                // 用户初始化
                socket.emit('init-login', ret)

                // 获取在线用户
                let users = await userColt.find({_id:{$ne:result._id}, online:1}, {projection:{userName:1, portrait:1}}).toArray()
                socket.emit('sync-user', makeResult(users))

                // 发送用户上线通知其他人
                ret.message = '用户上线'
                socket.broadcast.emit('user-online', ret)

                //查询属于用户的所有群
                let userGroup
                await groupUserClct.aggregate([
                    {
                        $match: {
                            user: result._id.toString()
                        }
                    }, 
                    {
                        $lookup: {
                            from: 'userGroup',
                            localField: 'group',
                            foreignField: '_id',
                            as: 'groupInfo'
                        }
                    }, 
                    {
                        $project: {
                            groupId: '$group',
                            groupName: {$arrayElemAt: ['$groupInfo', 0]}
                        }
                    },
                    {
                        $project: {
                            groupId:1, 
                            groupName:'$groupName.name'
                        }
                    }
                ], async function(error, cursor) {
                    userGroup = await cursor.toArray()
                })
                if (userGroup && userGroup.length) {
                    // 加入群组
                    userGroup.forEach(group => {
                        socket.join(group.groupId.toString())
                    });

                    socket.emit('init-group', userGroup)
                }

                socket.on('disconnect', () => {
                    // 数据库同步用户上线状态
                    userColt.updateOne(data, {$set:{online:0}})
                    // 用户下线
                    socket.broadcast.emit('user-offline', ret)
                    socketMap.delete(result._id.toString())
                    socket.emit('socket-close', {code: '1004', message: '会话关闭'})
                    console.log('socket close')
                })
            } else {
                console.log('用户或密码不存在')
                callback(makeResult(null, {code: '1002', message: '用户或密码不存在'}))
                socket.disconnect()
            }
        }).catch(function (err) {
            console.log(err)
        }).then(function () {
            // 接收转发私人消息
            socket.on('message', data => {
                let toSocketId = data.to._id.toString(),
                    toSocketObj = socketMap.get(toSocketId)
                
                if (toSocketObj) {
                    // toSocket.emit()
                    socket.to(toSocketObj.socketId).emit('message', data)
                } else if (socket.rooms[toSocketId]) {
                    socket.to(toSocketId).emit('message', data)
                }
                
            })
        })
        // console.log(data, new Date())
        // let res = ctx.mongo.db().find(data).toArray()
        // if (res.length <= 0) io.close(() => {console.log('socket closed')})x
    })

    socket.on('logout', (data, callback) => {
        callback(makeResult({code: '1000', message: '退出成功'}))
        socket.disconnect()
    })

    // 中间件校验http session是否登录或超时
    socket.use(async (package, next) => {
        // 模拟http请求获取httpsessoin
        let request = Object.assign({secure:true}, socket.request) // 构造http request
        let ctx = {req:request, app, request:request} // 构造 koa ctx
        Object.setPrototypeOf(ctx, app.context)
        await sessionMiddleware(ctx, auth)
        function auth() {
            let user = ctx.session.user
            if (!user) { // 登录超时或未消登录
                socket.emit('timeout', makeResult(null, {code: '1002', message: '用户或密码不存在'}))
            }
            next(user ? null : new Error('User not login'))
        }
    })
    
})

/* function createGroupSocket(group, user) {
    
    global.io.clients((error, clients) => {
        console.log(clients)
    })
}
global.socketObj = {
    io,
    socketMap
} */

app.use(sessionMiddleware);
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
app.use(controller())

let getIPAdress = require('./back-end/utils/ip')
let address = getIPAdress()
server.listen(3000, address, (c) => {
    console.log('listening on %s:3000', address)
})
process.on('SIGINT', () => {
    var chalk = require('chalk')
    console.log(chalk.yellow('server exit'))
    MongoClient.connect(...mongodbConfig).then(async (client) => {
        await client.db().collection('user').updateMany({}, {$set:{online:0}})
        process.exit()
    }).catch(() => {
        process.exit()
    })
})