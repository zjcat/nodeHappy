/**
 * @description: user view 路由
 * @author zjcat
 */

const router = require('koa-router')()
const { loginRedirect } =require('../../middlewares/loginChecks')
/**
 * 断是否登录
 * @param {object} ctx 参数信息 
 */
function getLoginInfo(ctx){
  const userInfo =  ctx.session.userInfo
  let data = {
    isLogin:false
  }
  if(userInfo){
    data = {
      isLogin:true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting',loginRedirect,async (ctx,next)=>{
  await ctx.render('setting',ctx.session.userInfo)
})

module.exports = router