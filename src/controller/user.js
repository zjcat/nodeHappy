/**
 * @description user controller 业务逻辑处理 调用 services； 数据获取； 统一返回格式
 * @author zjcat
 */

//const user = require('../services/user')
const {getUserInfo,createUser} = require('../services/user')
const {SuccessModel,ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo,registerUserNameExistInfo,registerFailInfo} = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  
  const userInfo = await getUserInfo(userName)
  if(userInfo){
    //已存在
    return new SuccessModel(userInfo)
  }else{
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
async function register({userName,password,gender}) {
  
  const userInfo = await getUserInfo(userName)
  if(userInfo){
    //已存在
    return new SuccessModel(registerUserNameExistInfo)
  }
  try {
    await createUser({
      userName,password,gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message,error.stack)
    return new SuccessModel(registerFailInfo)
  }
  
}

module.exports = {
  isExist,
  register
}