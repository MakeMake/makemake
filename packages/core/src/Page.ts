import { firestore } from 'firebase'
import { key } from 'firebase-key'
import { Project } from './Project'

export interface PageInterface {
  id: string
  description: string
  name: string
  path: string
  template: string
  style: string
  script: string
}

export const Page = {
  create(page: Partial<PageInterface> = {}): PageInterface {
    const defaultValues = {
      id: key(),
      name: '',
      description: '',
      path: '',
      template: '',
      style: '',
      script: ''
    }

    return {
      ...defaultValues,
      ...page
    }
  },

  queryByID(db: firestore.Firestore) {
    return (projectID: string, pageID: string) => {
      return Project.queryByID(db)(projectID)
        .collection('pages')
        .doc(pageID)
    }
  },

  queryByProject(db: firestore.Firestore) {
    return (projectID: string) => {
      return Project.queryByID(db)(projectID).collection('pages')
    }
  },

  /*
   * Create a page
   */
  createPage(db: firestore.Firestore) {
    return async (
      page: PageInterface,
      projectID: string
    ): Promise<PageInterface> => {
      return Page.queryByID(db)(projectID, page.id).set(page)
    }
  },

  /*
   * Create a page
   */
  updatePage(db: firestore.Firestore) {
    return async (
      page: PageInterface,
      projectID: string
    ): Promise<PageInterface> => {
      return Page.queryByID(db)(projectID, page.id).set(page)
    }
  }
}
