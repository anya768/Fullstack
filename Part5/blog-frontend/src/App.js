import { useState, useEffect, useRef, useMemo } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs(initialBlogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, error = false) => {
    setNotification({ message, error })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong username or password', true)
    }
  }

  const handleLogout = async () => {
    setUser(null)
    blogService.setToken('')
    window.localStorage.removeItem('loggedUser')
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      ...newBlog
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)

    } catch (error) {
      showNotification(error.response.data.error, true)
    }
  }

  const updateLikes = async (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map(note => note.id !== id ? note : returnedBlog))
    } catch (error) {
      console.log(error)
      showNotification(
        `Blog '${blog.title}' was already removed from server`, true
      )
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find( b => b.id === id )
    try{
      if ( window.confirm(`Remove ${blog.title} by ${blog.author}`) ) {
        await blogService.deleteBlog(id)
        setBlogs( blogs.filter( b => b.id !== id ) )
        showNotification(`Deleted ${blog.title}`)
      }
    } catch (error) {
      showNotification(error.response.data.error, true)
    }
  }

  const blogFormRef = useRef()

  const sortedBlogs = useMemo(() => blogs.slice().sort((a, b) => b.likes - a.likes), [blogs])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin} /> :
        <div>
          <p>{user.name} logged in
            <button type="submit" onClick={handleLogout}>logout</button>
          </p>
          <div>
            <Togglable buttonLabel='New Blog' ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
            <br />
            {sortedBlogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={updateLikes}
                deleteBlog={deleteBlog}
                isDeletable={blog?.user?.username === user.username}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App