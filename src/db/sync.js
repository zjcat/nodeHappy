/**
 * @description sequelize 同步
 * @author zjcat
 */
const seq = require('./seq')
require('./model/index')

// 测试连接
seq.authenticate().then(()=>{
    console.log('auth ok')
}).catch(()=>{
    console.log('auth err')
})

// 执行同步 清空数据 未免数据干扰
seq.sync({force:true}).then(()=>{
    console.log('sync ok')
    process.exit()
})