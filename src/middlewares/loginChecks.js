/**
 * @description 判断是否登录 中间件
 * @author zjcat
 */

const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  loginCheckFailInfo
} = require('../model/ErrorInfo')

/**
 * api 验证是否登录
 * @param {object} ctx ctx
 * @param {function} next next
 */
async function loginCheck(ctx,next){
  if(ctx.session&& ctx.session.userInfo){
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面验证是否登录
 * @param {object} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx,next){
  if(ctx.session && ctx.session.userInfo){
    await next()
    return
  }
  const curUrl =  ctx.url
  ctx.redirect(`login?url=${encodeURIComponent(curUrl)}`)
}

module.exports={
  loginCheck,
  loginRedirect
}