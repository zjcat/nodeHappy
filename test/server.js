/**
 * @description jest server
 * @author zjcat
 */

 const request = require('supertest');
 const server = require('../src/app').callback()

 module.exports= request(server);