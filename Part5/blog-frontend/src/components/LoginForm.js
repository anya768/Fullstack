const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (<form onSubmit={handleLogin}>
    <div>
            username
      <input
        type="text"
        value={username}
        name="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
            password
      <input
        type="password"
        value={password}
        name="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button className="btn-login" type="submit">login</button>
  </form>    )
}

export default LoginForm