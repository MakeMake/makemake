import { firestore } from 'firebase'
import { Project } from './Project'
import { key } from 'firebase-key'

export interface MemberInterface {
  id: string
  projectID: string
  role: 'admin' | 'member'
  inviteID: string
  email: string
}

export const Member = {
  create(form: Partial<MemberInterface> = {}): MemberInterface {
    const defaultValues: MemberInterface = {
      id: key(),
      projectID: '',
      role: 'member',
      inviteID: '',
      email: ''
    }

    return {
      ...defaultValues,
      ...form
    }
  },
  queryByProject(db: firestore.Firestore) {
    return (projectID: string) => {
      return Project.queryByID(db)(projectID).collection('members')
    }
  },

  queryByID(db: firestore.Firestore) {
    return (projectID: string, memberID: string) => {
      return Project.queryByID(db)(projectID)
        .collection('members')
        .doc(memberID)
    }
  },

  queryByUser(db: firestore.Firestore) {
    return (userID: string) => {
      return db.collectionGroup('members').where('id', '==', userID)
    }
  }
}
