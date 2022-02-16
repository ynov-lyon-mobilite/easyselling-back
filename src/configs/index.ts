import * as firebaseConfig from '../../serviceAccountKey.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  apiUrl: process.env.API_URL,
  firebase: {
    credential: firebaseConfig,
    apiKey: process.env.FIREBASE_API_KEY,
    bucketName: process.env.FIREBASE_BUCKET_NAME,
  },
};
