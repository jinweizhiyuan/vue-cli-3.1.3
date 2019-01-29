const fs = require('fs')
const path = require('path')

function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('get')) {
            router.get(url.substring(4), mapping[url])
        } else if (url.startsWith('post')) {
            router.post(url.substring(5), mapping[url])
        } else {
            console.log(`invalid URL ${url}`)
        }
    }
}

function addController(router, controllers_dir) {
    controllers_dir = path.join(__dirname, controllers_dir)
    // console.log(controllers_dir)
    let files = fs.readdirSync(controllers_dir)
    let jsfiles = files.filter((file) => {
        return file.endsWith('.js')
    })

    for (let f of jsfiles) {
        let mapping = require(path.join(controllers_dir, f))
        addMapping(router, mapping)
    }
}

module.exports = function(dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();

    addController(router, controllers_dir)

    return router.routes()
}