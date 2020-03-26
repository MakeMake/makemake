import { snapshotToArray } from '../helpers'

export const pageActions = {
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
