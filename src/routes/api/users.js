/**
 * @description 负责 user api 相关接口的派发和获取
 */
const router = require('koa-router')()
const {
  SECRET
} = require('../../conf/constants')
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const userValidate =  require('../../validator/user')
const genValidator =  require('../../middlewares/validator')
router.prefix('/api/user')
const {
  isExist,
  register,
  login
} = require('../../controller/user')
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//登录
router.post('/login', async (ctx, next) => {
  const {
    userName,
    password
  } = ctx.request.body
  //加密 userInfo
  //let token
  // if (userInfo) {
  //   token = jwt.sign(userInfo, SECRET, {
  //     expiresIn: '1h'
  //   })
  // }
  ctx.body = await login(ctx,userName,password)
})
//获取用户信息
router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (error) {
    ctx.body = {
      errno: -1,
      msg: 'verify token failed'
    }
  }
})

//注册路由
router.post('/register',genValidator(userValidate), async (ctx, next) => {
  const {userName,password,gender} = ctx.request.body
  ctx.body = await register({userName,password,gender})
})
//用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const {
    userName
  } = ctx.request.body
  ctx.body = await isExist(userName)
})
module.exports = router