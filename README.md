# 功能说明

验证用户登录成功后，提供聊天功能

# 使用技术
nodejs、soket.io、koa、vue、vuex、vue-router、vux

# 数据库
mongodb 4.0.5
## 数据库配置(window)
1. 从mongodb官网下载[数据库](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.6.zip),并解压
2. 在解压根目录中添加master.cfg文件，内容如下：
```
systemLog:
   # verbosity: 0  #日志等级，0-5，默认0
   # quiet: false  #限制日志输出，
   # traceAllExceptions: true  #详细错误日志
   # syslogFacility: user #记录到操作系统的日志级别，指定的值必须是操作系统支持的，并且要以--syslog启动
   path: E:\program\mongodb-win32-x86_64-2008plus-ssl-4.0.5\log\master\mongod.log  #日志路径。
   logAppend: true #启动时，日志追加在已有日志文件内还是备份旧日志后，创建新文件记录日志, 默认false
   #logRotate: rename #rename/reopen。rename，重命名旧日志文件，创建新文件记录；reopen，重新打开旧日志记录，需logAppend为true
   destination: file #日志输出方式。file/syslog,如果是file，需指定path，默认是输出到标准输出流中
   #timeStampFormat: iso8601-local #日志日期格式。ctime/iso8601-utc/iso8601-local, 默认iso8601-local
   # component: #各组件的日志级别
   #    accessControl:
   #       verbosity: <int>
   #    command:
   #       verbosity: <int>

#processManagement:
   #fork: true #以守护进程运行 默认false
   # pidFilePath: <string> #PID 文件位置

net:
   port: 27017 #监听端口，默认27017
   bindIp: 127.0.0.1 #绑定监听的ip，deb和rpm包里有默认的配置文件(/etc/mongod.conf)里面默认配置为127.0.0.1,若不限制IP，务必确保认证安全，多个Ip用逗号分隔
   #maxIncomingConnections: 65536 #最大连接数，可接受的连接数还受限于操作系统配置的最大连接数
   #wireObjectCheck: true #校验客户端的请求，防止错误的或无效BSON插入,多层文档嵌套的对象会有轻微性能影响,默认true
   #ipv6: false #是否启用ipv6,3.0以上版本始终开启
   #unixDomainSocket: #unix socket监听，仅适用于基于unix的系统
   #   enabled: false #默认true
   #   pathPrefix: /tmp #路径前缀，默认/temp
   #   filePermissions: 0700 #文件权限 默认0700
   #http: #警告 确保生产环境禁用HTTP status接口、REST API以及JSON API以防止数据暴露和漏洞攻击
   #   enabled: false #是否启用HTTP接口、启用会增加网络暴露。3.2版本后停止使用HTTP interface
   #   JSONPEnabled: false #JSONP的HTTP接口
   #   RESTInterfaceEnabled: false #REST API接口
   # ssl: #估计用不到，所以没有自己看
   #    sslOnNormalPorts: <boolean>  # deprecated since 2.6
   #    mode: <string>
   #    PEMKeyFile: <string>
   #    PEMKeyPassword: <string>
   #    clusterFile: <string>
   #    clusterPassword: <string>
   #    CAFile: <string>
   #    CRLFile: <string>
   #    allowConnectionsWithoutCertificates: <boolean>
   #    allowInvalidCertificates: <boolean>
   #    allowInvalidHostnames: <boolean>
   #    disabledProtocols: <string>
   #    FIPSMode: <boolean>

security:
   authorization: enabled # enabled/disabled #开启客户端认证
   # javascriptEnabled:  true #启用或禁用服务器端JavaScript执行
   keyFile: E:\program\mongodb-win32-x86_64-2008plus-ssl-4.0.5\db\master\keyfile #<string> #密钥路径
   # clusterAuthMode: <string> #集群认证方式
   # enableEncryption: <boolean>
   # encryptionCipherMode: <string>
   # encryptionKeyFile: <string>
   # kmip:
   #    keyIdentifier: <string>
   #    rotateMasterKey: <boolean>
   #    serverName: <string>
   #    port: <string>
   #    clientCertificateFile: <string>
   #    clientCertificatePassword: <string>
   #    serverCAFile: <string>
   # sasl:
   #    hostName: <string>
   #    serviceName: <string>
   #    saslauthdSocketPath: <string>
   

# setParameter: #设置参数
#    <parameter1>: <value1>
#    <parameter2>: <value2>

storage:
   dbPath: E:\program\mongodb-win32-x86_64-2008plus-ssl-4.0.5\db\master #数据库，默认/data/db,如果使用软件包管理安装的查看/etc/mongod.conf
   #indexBuildRetry: true #重启时，重建不完整的索引
   #repairPath: <string>  #--repair操作时的临时工作目录，默认为dbPath下的一个_tmp_repairDatabase_<num>的目录
   journal: 
      enabled: true #启动journal,64位系统默认开启，32位默认关闭
      # commitIntervalMs: <num> #journal操作的最大时间间隔，默认100或30
   #directoryPerDB: false #使用单独的目录来存储每个数据库的数据,默认false,如果需要更改，要备份数据，删除掉dbPath下的文件，重建后导入数据
   # syncPeriodSecs: 60 #使用fsync来将数据写入磁盘的延迟时间量,建议使用默认值
   #engine: wiredTiger #存储引擎，mmapv1/wiredTiger/inMemory 默认wiredTiger
   # mmapv1:
   #    preallocDataFiles: <boolean>
   #    nsSize: <int>
   #    quota:
   #       enforced: <boolean>
   #       maxFilesPerDB: <int>
   #    smallFiles: <boolean>
   #    journal:
   #       debugFlags: <int>
   #       commitIntervalMs: <num>
   # wiredTiger:
   #    engineConfig:
   #       cacheSizeGB: <number>  #缓存大小
   #       journalCompressor: <string> #数据压缩格式 none/snappy/zlib
   #       directoryForIndexes: <boolean> #将索引和集合存储在单独的子目录下，默认false
   #    collectionConfig:
   #       blockCompressor: <string> #集合数据压缩格式 
   #    indexConfig:
   #       prefixCompression: <boolean> #启用索引的前缀压缩
   # inMemory:
   #    engineConfig:
   #       inMemorySizeGB: <number>
 
#operationProfiling: #性能分析
#   slowOpThresholdMs: 100 #认定为查询速度缓慢的时间阈值，超过该时间的查询即为缓慢查询，会被记录到日志中, 默认100
#   mode: off #operationProfiling模式 off/slowOp/all 默认off
#
replication: #复制集相关
#    oplogSizeMB: <int>
    replSetName: replicaSet
#    secondaryIndexPrefetch: <string>
#    enableMajorityReadConcern: <boolean>
# sharding: #集群分片相关
#    clusterRole: <string>
#    archiveMovedChunks: <boolean>

# auditLog:
#    destination: <string>
#    format: <string>
#    path: <string>
#    filter: <string>

# snmp:
#    subagent: <boolean> #当设置为true，SNMP作为代理运行
#    master: <boolean> #当设置为true，SNMP作为主服务器运行

# basisTech:
#    rootDirectory: <string>

```
3. 进入mongodb/bin目录，命令行运行`mongod --config ../master.cfg`命令启动数据库
4. 在bin目录下，新建一个命令行运行`mongo`命令，执行以下命令：
```
use admin
db.createUser({user:'admin', pwd:'admin', roles:['root']})
use chat
db.createCollection('user')
db.createCollection('userGroup')
db.createCollection('userMapGroup')
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
