export default function({ store, redirect, route }) {
  const loginRoutes = ['/signin', '/signup']

  // If user tries to access another route than signin/signup without being logged
  // Redirect to login
  if (!loginRoutes.includes(route.path) && !store.state.user) {
    redirect('/signin')
  }

  // If user tries to access signin route while being logged
  // Redirect to /app
  if (loginRoutes.includes(route.path) && store.state.user) {
    redirect('/app')
  }

  // If user has no memberships, redirect to new project
  if (route.path !== '/new' && !store.state.memberships.length) {
    redirect('/new')
  }
}
