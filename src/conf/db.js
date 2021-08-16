/**
 * @description 存储配置
 * @author zjcat
 */
const {
    isProd
} = require('../util/env')

let REDIS_CONF = {
    por: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'hoppy'
}

if (isProd) {
    REDIS_CONF = {
        // 线上的 redis 的配置
        por: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        //线上的 mysql 的配置
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'hoppy'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}