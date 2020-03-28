import { Bucket, Storage } from '@google-cloud/storage';
import { firebaseAdmin } from '../config';

async function getBucket(slug: string): Promise<any> {
  const gcs = new Storage({
    projectId: firebaseAdmin.project_id,
    credentials: firebaseAdmin
  });

  const EXPORT_BUCKET = `${slug}.hosting.trymakemake.com`

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
  await bucket.setMetadata({ website: {
      mainPageSuffix: 'index.html',
      notFoundPage: '404.html'
    }})
}

export default getBucket;
