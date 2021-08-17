/**
 * @description 验证 users 模型
 * @author zjcat
 */

const {User} = require('../../src/db/model/index');

test('验证模型是否符合预期',()=>{
    const user = User.build({
        userName:'zhangsan',
        password:'p1234',
        nickName:'张三',
        picture:'/XXX.png',
        city:'北京'
    })
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p1234')
    expect(user.nickName).toBe('张三')
    expect(user.picture).toBe('/XXX.png')
    expect(user.city).toBe('北京')
    expect(user.gender).toBe(3)
})