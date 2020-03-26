import { Member } from '@makemake/core'
import { snapshotToArray } from '../helpers'

export const memberActions = {
  // user
  listenMemberships: function({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      Member.queryByUser(this.$fireStore)(state.user.uid).onSnapshot(
        async (snap) => {
          const memberships = snapshotToArray(snap)
          commit('SET_MEMBERSHIPS', memberships)

          if (memberships.length) {
            await dispatch('listenProject')
          }
          resolve()
        }
      )
    })
  }
}
