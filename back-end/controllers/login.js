const mongoClient = require('mongodb').MongoClient;

async function login(ctx, next) {
    const userTable = await ctx.mongo.db().collection('user')
    const result = await userTable.find(ctx.request.body).toArray()
    let ret
    if (result.length > 0) {
        ret = {code: '1000', message: 'success'}
    } else {
        ret = {code: '1002', message: '用户或密码不存在'}
    }
    ctx.response.body = ret
    next()
}
async function regist(ctx, next) {
    const userTable = ctx.mongo.db().collection('user')
    const result = await userTable.find({userName: ctx.request.body.userName}).toArray()
    let ret;

    if (result.length > 0) {
        ret = {code: '1001', message: '用户已存在'}
    } else {
        let result = await userTable.insert({userName: ctx.request.body.userName, password: ctx.request.body.password, portrait: ctx.request.body.portrait, online:0})
        ret = {code: '1000', message: '注册成功'}
    }
    ctx.response.body = ret
    await next()
// console.log('regist')
//     mongoClient.connect('mongodb://admin:admin@127.0.0.1:27017/chat', { useNewUrlParser: true }).then(function() {
//         console.log(arguments);
//         next();
//     })
}

module.exports = {
    'post /api/login': login,
    'post /api/regist': regist
}