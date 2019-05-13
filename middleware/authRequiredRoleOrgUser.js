export default function ({ store, error }) {
  const allowedRole = ['orgUser', 'orgAdmin', 'admin']
  if (!allowedRole.includes(store.state.users.user.role)) {
    error({
      message: 'You have NO permission to access this page.',
      statusCode: 403
    })
  }
}
