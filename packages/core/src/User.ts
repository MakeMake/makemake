import { firestore } from 'firebase'
import { key } from 'firebase-key'

export interface UserInterface {
  id: string
  displayName: string
  photoURL: string
}

export const User = {
  create(user: Partial<UserInterface> = {}): UserInterface {
    const defaultValues = {
      id: key(),
      displayName: '',
      photoURL: ''
    }

    return {
      ...defaultValues,
      ...user
    }
  },
  queryByID(db: firestore.Firestore) {
    return (userID: string) => {
      return db.collection('users').doc(userID)
    }
  }
}
