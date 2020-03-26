export const authActions = {
  // user
  listenAuth: function({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      return this.$fireAuth.onAuthStateChanged(async (user) => {
        commit('SET_USER', user)

        if (user) {
          await dispatch('listenMemberships')
        }

        resolve()
      })
    })
  },
  signup: function(
    context: any,
    { email, password }: { email: string; password: string }
  ) {
    return this.$fireAuth.createUserWithEmailAndPassword(email, password)
  },
  signin: function(
    context: any,
    { email, password }: { email: string; password: string }
  ) {
    return this.$fireAuth.signInWithEmailAndPassword(email, password)
  }
}
