const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const koaStatic = require('koa-static')
//const jwtKoa = require('koa-jwt');

//const { SECRET } = require('./conf/constants');

//注册路由
const index = require('./routes/api/index')
const blogApiRouter  = require('./routes/api/blog-index')
const userApiRouter = require('./routes/api/users')
const userApiUtil = require('./routes/api/util')
const errorViewRouter = require('./routes/view/error')
const userViewRouter = require('./routes/view/user')

const {
  REDIS_CONF
} = require('./conf/db')
// error handler
onerror(app)

//加密
// app.use(jwtKoa({
//   secret:SECRET
// }).unless({path:[/^\/users\/login/]}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname ,'..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//session 配置
app.keys = ['UIsdf_7878#$']
app.use(session({
  key: 'hoppy.sid',
  refix: 'weibo:sess:',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 //ms
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// 注册routes
app.use(index.routes(), index.allowedMethods())
app.use(blogApiRouter.routes(), blogApiRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(userApiUtil.routes(), userApiUtil.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app