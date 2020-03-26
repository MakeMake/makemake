import { snapshotToArray } from '../helpers'
import { Page, PageInterface } from '@makemake/core'

export const pageActions = {
  listenPages: function({ commit, state }) {
    Page.queryByProject(this.$fireStore)(state.project.id).onSnapshot(
      (snap) => {
        const pages = snapshotToArray(snap)
        commit('SET_PAGES', pages)
      }
    )
  },
  createPage: function({ state }) {
    const page = Page.create({ name: 'Untitled' })

    return Page.createPage(this.$fireStore)(page, state.project.id)
  },
  updatePage: function({ state }, page: PageInterface) {
    return Page.updatePage(this.$fireStore)(page, state.project.id)
  }
}
