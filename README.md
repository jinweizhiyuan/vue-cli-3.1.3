# 功能说明

验证用户登录成功后，提供聊天功能

# 使用技术
nodejs、soket.io、koa、vue、vuex、vue-router、vux

# 数据库
mongodb

# 配置注意
由于引用了vux并且使用了vue-cli3.1，导致webpack打包时报错`"export 'default' (imported as 'querystring') was not found in '../../tools/`，解决方法有两个

1. 从vuxgithub项目下载master分支，把其下的dist目录复制到node_modules/vux/下
2. babel.config.js中增加配置`"module":"commonjs"`

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
