import { vuexfireMutations, firestoreAction } from 'vuexfire'

import Vue from 'vue'
import {
  authActions,
  pageActions,
  memberActions,
  projectActions,
  tableActions,
  recordActions
} from './actions'

export const state = () => ({
  user: null,
  pages: [],
  tables: [],
  records: [],
  memberships: [],
  project: null
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
  },
  SET_TABLES: (state, tables) => {
    state.tables = tables
  },
  SET_RECORDS: (state, records) => {
    state.records = records
  },
  SET_MEMBERSHIPS: (state, memberships) => {
    state.memberships = memberships
  },
  SET_PROJECT: (state, project) => {
    state.project = project
  }
}
export const actions = {
  ...authActions,
  ...pageActions,
  ...memberActions,
  ...projectActions,
  ...tableActions,
  ...recordActions
}

export const getters = {
  user(state) {
    return state.user
  },
  pages(state) {
    return state.pages
  },
  tables(state) {
    return state.tables
  },
  table(state) {
    return (id: string) => {
      console.log(state.tables)
      const res = state.tables.find((table) => table.id === id)

      return res
    }
  },
  page(state) {
    return (id: string) => {
      const res = state.pages.find((page) => page.id === id)

      return res
    }
  },
  records(state) {
    console.log(state.records)
    return state.records
  }
}
