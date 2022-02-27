import { useState } from 'react'
const Blog = ({ blog, updateLikes, deleteBlog, isDeletable }) => {
  const [showDetails, setShowDetails] = useState(false)

  const buttonText = showDetails? 'Hide' : 'Show'
  return (
    <div className="detail">
      <div className="title">
        {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{buttonText}</button>
      </div>
      {showDetails?

        <div className="toggle-view">
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button className="btn-like" onClick={() => updateLikes(blog.id)}>like</button></div>
          <div>{blog.author}</div>
          {
            isDeletable?
              <button className="btn-delete" onClick={() => deleteBlog(blog.id)}>delete</button> : null
          }

        </div>
        :null
      }

    </div>
  )
}

export default Blog