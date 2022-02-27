const blogRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  response.status(200).json(await Blog.find({}).populate('user', { username: 1, name: 1 }))
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { body, user } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes) || 0,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.json(result)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() !== user._id.toString() ){
    response.status(401).send('you are not authorized for this action')
  }
  await blog.remove()
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  response.json(await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .populate('user', { username: 1, name: 1 }))

})

module.exports = blogRouter
