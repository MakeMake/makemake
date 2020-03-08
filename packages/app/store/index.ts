import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vue from 'vue'

export const state = () => ({
  user: null,
  pages: []
})
export const mutations = {
  ...vuexfireMutations,
  SET_USER: (state, user) => {
    state.user = user
      ? {
          uid: user.uid
        }
      : null
  },
  SET_PAGES: (state, pages) => {
    state.pages = pages
  }
}
export const actions = {
  // user
  listenAuth: function({ commit }) {
    return new Promise((resolve, reject) => {
      return this.$fireAuth.onAuthStateChanged((user) => {
        commit('SET_USER', user)

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
  },

  //
  listenPages: function({ commit }) {
    return this.$fireStore
      .collection('projects')
      .doc('7mgD6u0ttGD6ZzIvUxtb')
      .collection('pages')
      .onSnapshot((snap) => {
        const pages = snapshotToArray(snap)
        commit('SET_PAGES', pages)
      })
  }
}
export const getters = {
  user(state) {
    return state.user
  },
  pages(state) {
    return state.pages
  },
  page(state) {
    return (id: string) => {
      console.log(state.pages)

      const res = state.pages.find((page) => page.name === id)
      console.log(res)

      return res
    }
  }
}

function snapshotToArray<Doc>(snapshot: any): Doc[] {
  const result: any = []

  snapshot.forEach((doc: any) => {
    result.push(doc.data())
  })

  return result
}
