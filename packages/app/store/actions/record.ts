import { Record } from '@makemake/core'
import { snapshotToArray } from '../helpers'

export const recordActions = {
  listenRecords: function({ commit, state }, tableID) {
    Record.queryByTable(this.$fireStore)(state.project.id, tableID).onSnapshot(
      (snap) => {
        console.log('snap', snap)
        const records = snapshotToArray(snap)
        commit('SET_RECORDS', records)
      }
    )
  },
  createRecord: function({ state }, { fields, tableID }) {
    const record = Record.create({ fields })
    return Record.createRecord(this.$fireStore)(
      record,
      state.project.id,
      tableID
    )
  }
}
