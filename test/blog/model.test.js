/**
 * @description 验证 blog 模型
 * @author zjcat
 */

const {Blog} = require('../../src/db/model/index');

test('验证模型是否符合预期',()=>{
    const user = Blog.build({
        userId:1,
        content:'p1234',
        image:'/XXX.png'
    })
    expect(user.userId).toBe(1)
    expect(user.content).toBe('p1234')
    expect(user.image).toBe('/XXX.png')
})