/**
 * @description 博客首页 api
 * @author zjcat
 */

const router =  require('koa-router')()
const {create} =require('../../controller/blog')
const {loginCheck} = require('../../middlewares/loginChecks')
const blogValidate =  require('../../validator/blog')
const genValidator =  require('../../middlewares/validator')
router.prefix('/api/blog')
router.post('/create',loginCheck,genValidator(blogValidate),async (ctx,next)=>{
  const {id:userId} = ctx.session.userInfo
  const {content,image} = ctx.request.body
  const result = await create({userId,content,image})
  ctx.body = result
})

module.exports = router