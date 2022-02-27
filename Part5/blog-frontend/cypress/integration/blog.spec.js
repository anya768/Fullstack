/* eslint-disable no-undef */
describe('Blog integration test suite', () => {
  const user = {
    username: 'admin',
    password: 'pass',
    name: 'admin'
  }
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('should display login form elements', () => {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login components test suite', function () {
    it('should login and show logged in view', function () {
      cy.get('input[name="username"]').type(user.username)
      cy.get('input[name="password"]').type(user.password)
      cy.get('.btn-login').click()
      cy.contains('Blogs')
      cy.contains(`${user.name} logged in`)
    })

    it('should display error message for incorrect credentials', function () {
      cy.get('input[name="username"]').type(user.username)
      cy.get('input[name="password"]').type('user.password')
      cy.get('.btn-login').click()
      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('Logged in view test suite', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })

    it('should successfully create a blog object', function () {
      cy.get('.btn-toggle').click()
      cy.get('input[name="title"]').type('asasd')
      cy.get('input[name="author"]').type('391jdasd')
      cy.get('input[name="url"]').type('httpttttt')
      cy.get('.btn-create').click()
      cy.get('.success').contains('a new blog asasd by 391jdasd added')
    })

    describe('should display list of blogs', function () {

      beforeEach(function () {
        cy.createBlog({ title: '3r32f32', author: '80fh23q', url: 'htptptpt', likes: 42 })
      })

      it('should diplay like btn', function () {
        cy.contains('Show').click()
        cy.contains('like').click()
        cy.contains('43')
      })

      it('should be able to delete blogs', function () {
        cy.contains('3r32f32')
        cy.contains('Show').click()
        cy.contains('delete').click()
        cy.contains('Deleted 3r32f32')
      })

    })


    describe('should display multiple blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'title1', author: 'auth', url: 'http', likes: 3 })
        cy.createBlog({ title: 'title2', author: 'auth', url: 'http', likes: 32 })
        cy.createBlog({ title: 'title3', author: 'auth', url: 'http', likes: 12 })
        cy.createBlog({ title: 'title4', author: 'auth', url: 'http', likes: 33 })
        cy.createBlog({ title: 'title5', author: 'auth', url: 'http', likes: 47 })
      })

      it('they are ordered according to likes ', function () {
        cy.get('.detail>.title').should((blogg) => {
          expect(blogg[0]).to.contain('title5')
          expect(blogg[1]).to.contain('title4')
          expect(blogg[2]).to.contain('title2')
          expect(blogg[3]).to.contain('title3')
          expect(blogg[4]).to.contain('title1')
        })
      })

    })

  })

})