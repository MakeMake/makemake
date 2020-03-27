import { Project } from '@makemake/core'
import * as slugify from 'slugify'

export const projectActions = {
  listenProject: function({ commit, state }) {
    return new Promise((resolve, reject) => {
      Project.queryByID(this.$fireStore)(
        state.memberships[0].projectID
      ).onSnapshot((snap) => {
        const project = snap.data()

        commit('SET_PROJECT', project)
        resolve()
      })
    })
  },
  createProject: function({ commit, state }, { name }) {
    const project = Project.create({
      name,
      slug: slugify(name),
      ownerID: state.user.uid
    })

    return Project.createProject(this.$fireStore)(project)
  }
}
