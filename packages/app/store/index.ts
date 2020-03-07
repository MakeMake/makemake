import { vuexfireMutations, firestoreAction } from 'vuexfire'
import Vue from 'vue'

export const state = () => ({
  user: null
})
export const mutations = {
  ...vuexfireMutations,
  SET_USER: (state, user) => {
    state.user = {
      uid: user.uid
    }
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
  }
}
export const getters = {
  user(state) {
    return state.user
  }
}
