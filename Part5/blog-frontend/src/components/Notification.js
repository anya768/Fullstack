const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  const { message, error } = notification

  return (
    <div className={error? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification