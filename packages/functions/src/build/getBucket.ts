import { Bucket, Storage } from '@google-cloud/storage';
import { firebaseAdmin } from '../config';

async function getBucket(projectID: string): Promise<any> {
  const gcs = new Storage({
    projectId: firebaseAdmin.project_id,
    credentials: firebaseAdmin
  });

  const EXPORT_BUCKET = `${firebaseAdmin.project_id}${projectID}`.toLowerCase()

  const bucket = gcs.bucket(EXPORT_BUCKET);

  const [bucketExists] = await bucket.exists();

  if (bucketExists) {
    return bucket;
  }

  await createBucket(bucket);
  return bucket;
}

async function createBucket(bucket: Bucket): Promise<void> {
  await bucket.create();
  await bucket.makePublic();
}

export default getBucket;
