const { makeResult } = require('../utils/common')

async function createGroup(ctx, next) {
    // TODO: 增加事务控制
    let session = await ctx.mongo.startSession({
        causalConsistency:true,
        readConcern: {level:'snapshot'},
        readPreference:{mode: 'primary'},
        writeConcern: {w:1}
    })
   
    // let groupClct = await session.collection('userGroup'),
    //     groupUserClct = await ctx.mongo.db().collection('userMapGroup'),
    //     ret,
    //     opt
    let groupClct = await ctx.mongo.db().collection('userGroup'),
        groupUserClct = await ctx.mongo.db().collection('userMapGroup'),
        ret,
        opt,
        users = ctx.request.body.users
    await session.startTransaction({
            readConcern: {level: 'snapshot'},
            writeConcern: {w: 1},
        })
    // 如果群内所有用户已经在某个群内，则返回这个群名不重新创建
    // let existGroup = await groupUserClct.group({
    //     key:{group:1}, 
    //     initial:{users:[]}, 
    //     reduce:function(curr, result){ 
    //         result.users.push(curr.user) 
    //     }}).find( function(group) {
    //         var query = [1,2]; 
    //         if (group.users.length == query.length) {
    //             return group.users.sort().toString() == query.toString()
    //         }
    //     })
    let existGroup
    await groupUserClct.aggregate([
        {
            $group: {
                _id:{group:"$group"},
                users: {$addToSet: "$user"}
            }
        },
        {
            $match: {
                users: {$all: users}
            }
        },{
            $lookup: {
                from: "userGroup",
                localField: "_id.group",
                foreignField: "_id",
                as: "groupMap"
            }
        },{
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        {$arrayElemAt:["$groupMap", 0]}, 
                        "$$ROOT"
                    ]
                }
            }
        },{
            $replaceRoot: {newRoot: {groupName:"$name", users:"$users", groupId:"$_id.group"}}
        }
    ], async function(error, cursor) {
        existGroup = await cursor.toArray()
    })
    if (existGroup.length) {
        // 加入群组
        let socketMap = global.socketMap
        existGroup[0].forach(group => {
            group.users.forEach(userId => {
                let socket = socket.get(userId)
                if (socket) {
                    socket.join(group.groupId)
                }
            })
            socket.join(group.groupId)
        })
        ret = existGroup
    } else {
        // 获取群个数
        let groupCount = await groupClct.countDocuments()
        // 设置群名称
        let groupName = '群聊' + (groupCount + 1)
        
        let insertResult = await groupClct.insertOne({name: groupName, createTime: new Date()}, {session:session})
            
        if (insertResult.result.ok) {
            // 插入群成员
            let usersRecord = users.map(u => {return {user:u, group:insertResult.insertedId}})
            let insertUserResult = await groupUserClct.insertMany(usersRecord, {session:session})

            if (insertUserResult.result.ok) {
                await session.commitTransaction()
                ret = {
                    groupId: insertResult.insertedId,
                    gorupName: groupName
                }
            } else {
                await session.abortTransaction()
                opt = {
                    code: '1003',
                    message: '用户加群失败'
                }
            }
        } else {
            await session.abortTransaction()
            opt = {
                code: '1003',
                message: '新建群失败'
            }
        }
    }
    ctx.response.body = makeResult(ret, opt)
    await session.endSession()
    next()
}

/**
 * @description 创建群socket会话
 * @date 2019-03-21
 * @param {Object} ctx koa ctx
 * @param {Object} group 群信息
 */
// function createGroupSocket(ctx, group) {
//     let socketObj = global.socketObj,
//         userId = ctx.session.user
//     socketObj.get('')
//     global.io.clients((error, clients) => {
//         console.log(clients)
//     })
// }

module.exports = {
    'post /api/createGroup': createGroup
}