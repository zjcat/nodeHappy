/**
 * @description 博客 controller
 */
const {
  createBlog
} = require('../services/blog')
const xss = require('xss')
const {
  createBlogFailInfo
} = require('../model/ErrorInfo')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')

async function create({
  userId,
  content,
  image
}) {
  try {
    const result = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(result)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}