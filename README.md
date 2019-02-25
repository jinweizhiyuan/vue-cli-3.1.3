# 功能说明

验证用户登录成功后，提供聊天功能

# 使用技术
nodejs、soket.io、koa、vue、vuex、vue-router、vux

# 数据库
mongodb 4.0.5
## 数据库配置
1. 从mongodb官网下载[数据库](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.6.zip),并解压
2. 进入mongodb/bin目录，命令行运行`mongod`命令启动数据库
3. 在bin目录下，新建一个命令行运行`mongo`命令，执行以下命令：
```
use admin
db.createUser({user:'admin', pwd:'admin', roles:['root']})
```
4. 在解压根目录中添加mongod.cfg文件，内容如下：
```
systemLog:
    destination: file
    path: D:\Program\mongodb-win32-x86_64-2008plus-ssl-4.0.5\data\log\mongod.log
    logAppend: true
storage:
    dbPath: D:\Program\mongodb-win32-x86_64-2008plus-ssl-4.0.5\data
    journal:
        enabled: true
net:
    bindIp: 0.0.0.0
    port: 27017
security:
    authorization: enabled
```

# 配置注意
由于引用了vux并且使用了vue-cli3.1，导致webpack打包时报错`"export 'default' (imported as 'querystring') was not found in '../../tools/`，解决方法有两个

1. 从[vux github](https://github.com/airyland/vux)项目下载master分支，打开下载项目的目录，运行npm run xbuild，把生成的dist目录复制到本项目node_modules/vux/下（不要运行npmi install下载node_modules， 如果下载会调用本目录下的less-loader覆盖本项目的less-loader）
2. babel.config.js中增加配置`"module":"commonjs"`，随之而来的问题是打包时无法按需打包，会把所有的vux打包，这个方法不完美
3. 所有的项目配置保持不变，找到node_modules/vux-loader/src/index.js，找到`======== append js-loader ========`替换其下的一段代码为
    ```javascript
    let _hasBabelLoader = false
    config.module[loaderKey].forEach(function (rule) {
        if (rule.use && (rule.use[0] === 'babel-loader' || (typeof rule.use[0] === 'object' && rule.use[0].loader === 'babel-loader'))) {
        rule.use.push(jsLoader)
        _hasBabelLoader = true
        } else {
        if (rule.loader === 'babel' || rule.loader === 'babel-loader' || (/babel/.test(rule.loader) && !/!/.test(rule.loader))) {
            if (isWebpack2 && (rule.query || rule.options)) {
            let options
            if(rule.options){
                options = rule.options
                delete rule.options
            }else{
                options = rule.query
                delete rule.query
            }
            rule.use = [{
                loader: 'babel-loader',
                options: options
            }, jsLoader]
            delete rule.loader
            _hasBabelLoader = true
            } else {
            rule.loader = 'babel-loader!' + jsLoader
            _hasBabelLoader = true
            }
        }
        }
    })
    if (!_hasBabelLoader) {
        config.module.rules.push({
        test: /\.js$/,
        loaders: [jsLoader]
        })
    }
    ```

__问题分析:__ 由于vux使用了commonjs模块，而vue使用的是esmodule，因此打包模块统一就可以了

参考：
    [关于vuejs-templates/webpack 中 “exports is not defined”报错的处理](https://segmentfault.com/a/1190000009526372)

    [@bable/preset-env](https://babeljs.io/docs/en/babel-preset-env/)

# 运行说明
后端启动 `node server.js`

前端启动 `npm run serve`

# vue-cli-3.1.3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
