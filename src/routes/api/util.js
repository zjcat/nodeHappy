/**
 * @description 公共 api
 * @author zjcat
 */

const router =  require('koa-router')()

const {loginCheck} = require('../../middlewares/loginChecks')
const koafrom = require('formidable-upload-koa')

const {saveFile} = require('../../controller/util')

router.prefix('/api/utils')

router.post('/upload',loginCheck,koafrom(),async (ctx,next)=>{
  const file =  ctx.req.files['file']
  const {size,path,name,type} = file
  ctx.body = await saveFile({size,filePath:path,name,type})
})

module.exports = router