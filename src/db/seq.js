/**
 * @description sequelize 实例
 * @author zjcat
 */
const Sequelize = require('sequelize')
const {
  MYSQL_CONF
} = require('../conf/db')
const {
  isPord,
  isTest
} = require('../util/env')
const {
  host,
  user,
  password,
  database
} = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => {}
}

if (isPord) {
  // 线上环境
  conf.pool = {
    max: 5,
    min: 0,
    idle: 1000 //如果一个连接池10s 之内没有被使用 则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq