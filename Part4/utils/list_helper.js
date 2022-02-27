// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, current) => prev + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((previous, current) => {
    return previous.likes > current.likes? previous : current
  },{})
}

const mostBlogs = (blogs) => {
  const maxMap = {}
  let maxBlog = { blogs: 0 }

  blogs.forEach(blog => {
    maxMap[blog.author]= maxMap[blog.author]? ++maxMap[blog.author] : 1
    if(maxMap[blog.author] > maxBlog.blogs)
      maxBlog = { author: blog.author, blogs: maxMap[blog.author] }
  })

  return maxBlog
}

const mostLikes = (blogs) => {
  const maxMap = {}
  let maxBlog = { likes: 0 }

  blogs.forEach(blog => {
    maxMap[blog.author]= maxMap[blog.author]? maxMap[blog.author]+blog.likes : blog.likes
    if(maxMap[blog.author] > maxBlog.likes)
      maxBlog = { author: blog.author, likes: maxMap[blog.author] }
  })

  return maxBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}