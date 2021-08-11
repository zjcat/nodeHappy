/**
 * @description 存储配置
 * @author zjcat
 */
const {isProd} = require('../util/env');

let REDIS_CONF = {
    por: 6379,
    host: '127.0.0.1'
}

if (isProd) {
    REDIS_CONF = {
        // 线上的 redis 的配置
        por: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    REDIS_CONF
}