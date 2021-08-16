/**
 * @description 数据格式化
 * @author zjcat
 */

const {
  DEFAULT_PICTURE
} = require('../conf/constants')

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */

function _formatUserPicture(obj) {
  if (obj.picture == null) {
    boj.picture = DEFAULT_PICTURE
  }
  return obj

}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象 
 */
function formatUser(list) {
  if (list == null) {
    return list
  }
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list)
}
module.exports = {
  formatUser
}