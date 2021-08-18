/**
 * @description user service
 * @author zjcat
 */

const {
  User
} = require('../db/model/index')

const {
  formatUser
} = require('./_format')

// const doCrypto =require('../util/cryp')
/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  //查询条件、
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, {
      password
    })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    return result
  }
  //格式化处理
  const formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1：男性，2：女，3：保密）
 * @param {string} nickName 昵称
 */
async function createUser({
  userName,
  password,
  gender = 3,
  nickName
}) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  })
  const data = result.dataValues

  return data
}

/**
 * 测试环境下删除当前且登录的用户信息
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  // result 删除的行数
  return result > 0
}

/**
 * 更新用户信息
 * @param {string} newPassword 修改的密码 
 * @param {string} newNickName 修改的昵称
 * @param {string} newPicture 修改的图片
 * @param {string} newCity 修改的城市
 * @param {string} userName 用户名
 * @param {string} password 老密码
 */
async function updatedUser({newPassword,newNickName,newPicture,newCity},{
  userName,
  password
}){
  //更新的内容
  const updataData = {}
  if(newPassword){
    updataData.password = newPassword
  }
  if(newNickName){
    updataData.nickName = newNickName
  }
  if(newPicture){
    updataData.picture = newPicture
  }
  if(newCity){
    updataData.city = newCity
  }
  //查询条件
  const whereData = {
    userName,
  }
  if(password){
    whereData.password = password
  }
  const result = await User.update(updataData,{
    where:whereData
  })
  return result[0]>0 //修改的行数
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updatedUser
}