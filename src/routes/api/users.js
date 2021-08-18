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
const {isTest} = require('../../util/env')
const { loginCheck } =  require('../../middlewares/loginChecks')
router.prefix('/api/user')
const {
  isExist,
  register,
  login,
  deleteCurUser,
  changePassword,
  changeInfo,
  logout
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

//删除当前登录的用户 用于单元测试
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试账号登录之后，删除自己
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

//修改密码
router.patch('/changePassword',loginCheck,async(ctx,next)=>{
  const {password,newPassword} = ctx.request.body
  ctx.body = await changePassword(ctx,password,newPassword)
})

//修改用户信息
router.patch('/changeInfo',loginCheck,genValidator(userValidate),async(ctx,next)=>{
  const {nickName,city,picture} = ctx.request.body
  ctx.body = await changeInfo(ctx,{nickName,city,picture})
})

//退出登录
router.post('/logout',loginCheck,async (ctx,next)=>{
  ctx.body = await logout(ctx)
})
module.exports = router