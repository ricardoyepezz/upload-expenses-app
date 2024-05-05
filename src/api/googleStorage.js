import { Storage } from '@google-cloud/storage';

const credentials = JSON.parse(process.env.REACT_APP_GOOGLE_CREDENTIALS_JSON);

const storage = new Storage({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key
  }
});

const bucketName = 'upload-expenses-app-bucket-1';

export default { storage, bucketName }
