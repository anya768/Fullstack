import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'


describe('Blog Component Test Suite', () => {
  let blogDetailComponent
  const updateLikes = jest.fn()
  const deleteBlog = jest.fn()
  const blog = {
    'title': 'test',
    'author': 'autho',
    'url': 'test url',
    'likes': 1
  }
  beforeEach(() => {
    blogDetailComponent = render(
      <Blog
        blog={blog}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
        isDeletable={true}
      />
    )
  })

  test('blog should display author', () => {
    const blogDetailDiv = blogDetailComponent.container.querySelector('.detail')
    expect(blogDetailDiv).toHaveTextContent(`${blog.title} Show`)
  })

  test('blog should not display details initially', () => {
    const togglableContentDiv = blogDetailComponent.container.querySelector('.toggle-view')
    expect(togglableContentDiv).toBeNull()
  })


  test('when details button is clicked, Blog should show its details', () => {
    const viewButton = blogDetailComponent.container.querySelector('button')
    fireEvent.click(viewButton)
    const togglableContentDiv = blogDetailComponent.container.querySelector('.toggle-view')
    expect(togglableContentDiv).not.toBeNull()
    expect(togglableContentDiv).toHaveTextContent(blog.url)
    expect(togglableContentDiv).toHaveTextContent(blog.likes)
  })

  test('like button should call handler twice if clicked twice', () => {
    const viewButton = blogDetailComponent.container.querySelector('button')
    fireEvent.click(viewButton)
    const likeButton = blogDetailComponent.container.querySelector('.btn-like')
    expect(updateLikes.mock.calls).toHaveLength(0)
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateLikes.mock.calls).toHaveLength(2)
  })

})


describe('BlogForm Component Test Suite', () => {
  const createBlog = jest.fn()
  let newBlogFormComponent

  beforeEach(() => {
    newBlogFormComponent = render(<BlogForm createBlog={createBlog} />)
  })

  test('form should call handler on submit', () => {
    const newBlogForm = newBlogFormComponent.container.querySelector('.blog-form')
    const author = newBlogFormComponent.container.querySelector('input[name="author"]')
    const title = newBlogFormComponent.container.querySelector('input[name="title"]')
    const url = newBlogFormComponent.container.querySelector('input[name="url"]')
    const newBlog = {
      'title': 'testitle',
      'author': 'testaut',
      'url': 'httpthtpspd'
    }
    fireEvent.change(title, { target: { value: newBlog.title } })
    fireEvent.change(author, { target: { value: newBlog.author } })
    fireEvent.change(url, { target: { value: newBlog.url } })
    fireEvent.submit(newBlogForm)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(newBlog)
  })

})