const MongoClient = require('mongodb').MongoClient;

function login(ctx, next) {
    ctx.body = {message: 'success'}
    next()
}
async function regist(ctx, next) {
    console.log(ctx.request.body);
    ctx.response.body = {code: '200', message: 'ok'}
    MongoClient.connect('mongodb://localhost:27107', (err, client) => {
        if (err) {
            ctx.response.body = {code: '404', message: 'database connect failure'}
        }

        let db = client.db('chat')
        var table = db.collection('user')
        table.find({userName:ctx.request.body.userName}).toArray((err, result) = {
            
        })
    })
    await next()
}

module.exports = {
    'post /api/login': login,
    'post /api/regist': regist
}