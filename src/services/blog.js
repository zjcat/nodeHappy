/**
 * @description 博客 services
 * @author zjcat
 */

const {Blog} = require('../db/model/index')

async function createBlog({userId,content,image}){
  const result =await Blog.create({
    userId,
    content,
    image
  })
  const data = result.dataValues
  return data

}

module.exports = {
  createBlog
}