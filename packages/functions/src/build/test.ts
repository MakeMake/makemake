import * as functions from 'firebase-functions';

export const test = functions.https.onCall(async data => {
  return {
    status: 'ok'
  };
});
