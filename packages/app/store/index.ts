import { vuexfireMutations, firestoreAction } from 'vuexfire'

import Vue from 'vue'
import {
  authActions,
  pageActions,
  memberActions,
  projectActions
} from './actions'

export const state = () => ({
  user: null,
  pages: [],
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
  ...projectActions
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
      const res = state.pages.find((page) => page.id === id)

      return res
    }
  }
}
