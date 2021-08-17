/**
 * @description 公共 controller
 * @author zjcat
 */

const path = require('path')
const {
  uploadFileSizeFailInfo
} = require('.././model/ErrorInfo')
const {
  ErrorModel,
  SuccessModel
} = require('../model/ResModel')
const fse = require('fs-extra')

//文件最大体积 1m
const MIX_SIZE = 1024 * 1024 * 1024
//存储的目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

//是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist=>{
  if(!exist){
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 
 * @param {number} size 文件大小
 * @param {string} filePath 文件路径
 * @param {string} name 文件名
 * @param {string} type 文件类型
 */
async function saveFile({
  size,
  filePath,
  name,
  type
}) {
  if (size > MIX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  //移动文件
  const fileName = Date.now() + '.' + name //防止文件名重复
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  //返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}