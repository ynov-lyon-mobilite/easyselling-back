import * as admin from 'firebase-admin';
import config from './index';

const firebase = admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(config.firebase.credential),
  storageBucket: config.firebase.bucketName,
});

export default firebase;
