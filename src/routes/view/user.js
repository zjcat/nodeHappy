/**
 * @description: user view 路由
 * @author zjcat
 */

const router = require('koa-router')()

router.get('/login',async (ctx,next)=>{
    await ctx.render('login',{})
})

router.get('/regiter',async (ctx,next)=>{
    await ctx.render('regiter',{})
})

module.exports = router