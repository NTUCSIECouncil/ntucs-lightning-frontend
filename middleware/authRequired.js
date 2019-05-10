export default function ({ store, error }) {
  if (!store.state.navbar.isLoggedIn) {
    error({
      message: 'You have NO permission to access this page.',
      statusCode: 403
    })
  }
}
