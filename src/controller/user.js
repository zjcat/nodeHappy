/**
 * @description user controller 业务逻辑处理 调用 services； 数据获取； 统一返回格式
 * @author zjcat
 */

//const user = require('../services/user')
const {
  getUserInfo,
  createUser,
  deleteUser,
  updatedUser,
} = require('../services/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../util/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {

  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    //已存在
    return new SuccessModel(userInfo)
  } else {
    //未存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }

}

/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1：男性，2：女，3：保密）
 */
async function register({
  userName,
  password,
  gender
}) {

  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    //已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }

}

/**
 * 登录
 * @param {object} ctx 存储session
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    //登录失败
    return new ErrorModel(loginFailInfo)
  }
  //登录成功
  //存储 session
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除用户信息
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户密码
 * @param {object} ctx ctx
 * @param {string} password 老密码
 * @param {string} newPassword 新密码
 */
async function changePassword(ctx,password, newPassword) {
  const userInfo = ctx.session.userInfo
  const {userName} = userInfo
  const result = await updatedUser({
    newPassword:doCrypto(newPassword)
  }, {
    userName,
    password:doCrypto(password)
  })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 修改用户信息
 * @param {object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 图片地址 
 */
async function changeInfo(ctx, {
  nickName,
  city,
  picture
}) {
  const 
    userInfo
   = ctx.session.userInfo
  if (!nickName) {
    nickName = userInfo
  }
  const {
    userName
  } = userInfo
  const result = await updatedUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture
  }, {
    userName
  })
  if (result) {
    Object.assign(ctx.session.userInfo,{
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 退出登录
 * @param {object} ctx ctx
 */
async function logout(ctx){
  delete ctx.session.userInfo
  return new SuccessModel()
}
module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changePassword,
  changeInfo,
  logout
}