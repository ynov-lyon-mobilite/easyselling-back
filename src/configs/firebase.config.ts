/* eslint-disable */
import * as admin from 'firebase-admin';
import config from './index';

const app = admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(config.firebase),
});

export default app
