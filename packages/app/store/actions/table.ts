import { snapshotToArray } from '../helpers'
import { Table, TableInterface } from '@makemake/core'

export const tableActions = {
  listenTables: function({ commit, state }) {
    Table.queryByProject(this.$fireStore)(state.project.id).onSnapshot(
      (snap) => {
        const tables = snapshotToArray(snap)
        commit('SET_TABLES', tables)
      }
    )
  },
  createTable: function({ state }) {
    const table = Table.create({ name: 'Untitled' })

    return Table.createTable(this.$fireStore)(table, state.project.id)
  },
  updateTable: function({ state }, table: TableInterface) {
    return Table.createTable(this.$fireStore)(table, state.project.id)
  }
}
