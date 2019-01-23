const Koa = require('koa');
const static = require('koa-static')
const cors = require('@koa/cors');
var bodyParser = require('koa-body-parser');
const path = require('path')
const app = new Koa();
const server = require('http').Server(app.callback());
// const io = require('socket.io')(server);



// io.on('connection', (socket) => {
//     console.log(socket);
// })

// io.on('login', (data) => {
//     console.log(data);
// })

app.use(cors())
app.use(static('dist'), {extensions: ['html', 'css', 'js', 'img', 'png']})
app.use(bodyParser())

let controller = require('./back-end/controller.js')
app.use(controller());

server.listen(3000, () => {
    console.log('listening on 3000')
});