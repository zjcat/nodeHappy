/**
 * @description 加密方式
 * @author zjcat
 */

const crypot = require('crypto')

//秘钥
const {CRYPTO_SECRET_KEY} = require('../conf/secretKeys')


/**
 * 加密方式
 * @param {string} content 明文 密码
 */
function _md5(content){
  const md5 = crypot.createHash('md5')
  return md5.update(content).digest('hex')
}

function doCrypto(content){
  const str =  `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto