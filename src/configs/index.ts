import * as firebaseConfig from '../../serviceAccountKey.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  firebase: firebaseConfig,
  firebaseApiKey: process.env.FIREBASE_API_KEY,
  // aws: {
  //   id: process.env.AWS_ID,
  //   secret: process.env.AWS_SECRET,
  //   bucketName: process.env.AWS_BUCKET_NAME,
  // },
};
