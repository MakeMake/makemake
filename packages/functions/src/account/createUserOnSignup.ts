import * as functions from 'firebase-functions'
import { creatFirebaseApp } from '../backend'
import { User } from '@makemake/core'

export const createUserOnSignup = functions.auth
  .user()
  .onCreate(async (user) => {
    const app = await creatFirebaseApp()

    const userProfile = User.create({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    })

    await User.queryByID(app.firestore())(user.uid).set(userProfile)
  })
