import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = (event) => {
    const blog = { ...newBlog }
    blog[event.target.name] = event.target.value
    setNewBlog(blog)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)

    setNewBlog({ title: '', author: '', url: '' })
  }
  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog} className="blog-form">
        <div>
      Title:
          <input
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
      Author:
          <input
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
          <div>
          </div>
      Url:
          <input
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <br />
        <button className='btn-create' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm