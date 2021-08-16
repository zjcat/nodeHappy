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

const doCrypto =require('../util/cryp')
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
      password:doCrypto(password)
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
    password:doCrypto(password),
    gender,
    nickName:nickName?nickName:userName
  })
}


module.exports = {
  getUserInfo,
  createUser
}