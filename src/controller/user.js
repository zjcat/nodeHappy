/**
 * @description user controller
 * @author zjcat
 */

//const user = require('../services/user')
const {getUserInfo} = require('../services/user')
const {SuccessModel,ErrorModel} = require('../model/ResModel')
const {registerUserNmaeNotExitInfo} = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  //业务逻辑处理
  //调用 services 数据获取
  const userInfo = await getUserInfo(userName)
  if(userInfo){
    //已存在
    return new SuccessModel(userInfo)
  }else{
    //未存在
    return new ErrorModel(registerUserNmaeNotExitInfo)
  }
    
  //统一返回格式
}

module.exports = {
  isExist
}