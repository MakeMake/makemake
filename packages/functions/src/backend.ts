/* eslint-disable no-undef */
import * as config from './config';
import * as firebaseAdmin from 'firebase-admin';
import { firebase } from './firebase';

let adminBackend;
let superAdminBackend;

export async function creatFirebaseApp(
  uid = 'admin-backend'
): Promise<firebase.app.App> {
  if (!adminBackend) {
    adminBackend = firebase.initializeApp({
      ...config.firebase
    });
  }

  if (!superAdminBackend) {
    superAdminBackend = firebaseAdmin.initializeApp({
      databaseURL: config.firebase.databaseURL,
      credential: firebaseAdmin.credential.cert({
        projectId: config.firebaseAdmin.project_id,
        clientEmail: config.firebaseAdmin.client_email,
        privateKey: config.firebaseAdmin.private_key
      })
    });
  }

  const token = await superAdminBackend.auth().createCustomToken(uid);
  await adminBackend.auth().signInWithCustomToken(token);

  return adminBackend;
}

export async function createFirebaseAdminApp(): Promise<firebase.app.App> {
  if (superAdminBackend) {
    return superAdminBackend;
  }

  superAdminBackend = firebaseAdmin.initializeApp({
    databaseURL: config.firebase.databaseURL,
    credential: firebaseAdmin.credential.cert({
      projectId: config.firebaseAdmin.project_id,
      clientEmail: config.firebaseAdmin.client_email,
      privateKey: config.firebaseAdmin.private_key
    })
  });

  return superAdminBackend;
}
