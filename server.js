const Koa = require('koa');
const static = require('koa-static')
const cors = require('@koa/cors');
const bodyParser = require('koa-body-parser');
const mongoDriver = require('koa-mongo-driver')
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('connection');
    socket.on('login', (data) => {
        let MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://admin:admin@127.0.0.1:27107/chat')
        // console.log(data, new Date())
        // let res = ctx.mongo.db().find(data).toArray()
        // if (res.length <= 0) io.close(() => {console.log('socket closed')})x
    })
})

app.use(cors())
app.use(static('dist'), {extensions: ['html', 'css', 'js', 'img', 'png']})
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