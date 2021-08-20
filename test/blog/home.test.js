/**
 * @description 首页接口单元测试
 * @author zjcat
 */

const {COOKIE} =require('../testUserInfo')
const server = require('../server')

let BLOG_ID = ''

test('创建一条微博，应该成功',async ()=>{
    //定义测试的内容
    const content = '单元测试自动创建微博——'+Date.now()
    const image = '/xxx.png'

    //开始测试
    const res = await server.post('/api/blog/create').send({content,image})
    .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    //记录微博id
    BLOG_ID = res.body.data.id
})

