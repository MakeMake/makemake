export default function({ store, redirect, route }) {
  const connectedRoutes = ['/dashboard']
  const loginRoutes = ['/signin', '/signup']

  if (connectedRoutes.includes(route.path) && !store.state.user) {
    redirect('/signin')
  }

  if (loginRoutes.includes(route.path) && store.state.user) {
    redirect('/app')
  }

  console.log('donothign')
}
