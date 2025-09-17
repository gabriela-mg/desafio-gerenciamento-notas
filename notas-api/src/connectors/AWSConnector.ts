import { CreateBucketCommand, DeleteBucketCommand, DeleteObjectCommand, GetObjectCommand, paginateListObjectsV2, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createInterface } from "readline";

const AWS = require('aws-sdk');

// Configure the AWS SDK to use the LocalStack endpoint and credentials
const lambda = new AWS.Lambda({
  endpoint: 'http://localhost:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test',
  region: 'us-east-1',
});

// List the Lambda functions using the LocalStack endpoint
lambda.listFunctions({}, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

// Now, we create an S3 client, which has a special endpoint
// You can read the S3 documentation to learn more about the different endpoints.
const s3 = new AWS.S3({
  endpoint: 'http://s3.localhost.localstack.cloud:4566',
  s3ForcePathStyle: true,  // If you want to use virtual host addressing of buckets, you can remove `s3ForcePathStyle: true`.
  accessKeyId: 'test',
  secretAccessKey: 'test',
  region: 'us-east-1',
});

// If your region is `us-east-1`, you will need to override the globalEndpoint of the client
// due to an issue in the SDK with `createBucket`.
// you will need to set it to the hostname of your endpoint specified right above
// If your region is different than `us-east-1`, you can skip that line
s3.api.globalEndpoint = 's3.localhost.localstack.cloud';

// Call an S3 API using the LocalStack endpoint
s3.listBuckets((err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

async function sla() {
  // A region and credentials can be declared explicitly. For example
  // `new S3Client({ region: 'us-east-1', credentials: {...} })` would
  //initialize the client with those settings. However, the SDK will
  // use your local configuration and credentials if those properties
  // are not defined here.
  const s3Client = new S3Client({});

  // Create an Amazon S3 bucket. The epoch timestamp is appended
  // to the name to make it unique.
  const bucketName = `test-bucket-${Date.now()}`;
  await s3Client.send(
    new CreateBucketCommand({
      Bucket: bucketName,
    }),
  );

  // Put an object into an Amazon S3 bucket.
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: "my-first-object.txt",
      Body: "Hello JavaScript SDK!",
    }),
  );

  // Read the object.
  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: "my-first-object.txt",
    }),
  );

  console.log(await Body.transformToString());

  // Confirm resource deletion.
  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const result = await prompt.question("Empty and delete bucket? (y/n) ", ()=>{});
  prompt.close();

  if (result === "y") {
    // Create an async iterator over lists of objects in a bucket.
    const paginator = paginateListObjectsV2(
      { client: s3Client },
      { Bucket: bucketName },
    );
    for await (const page of paginator) {
      const objects = page.Contents;
      if (objects) {
        // For every object in each page, delete it.
        for (const object of objects) {
          await s3Client.send(
            new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key }),
          );
        }
      }
    }

    // Once all the objects are gone, the bucket can be deleted.
    await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
  }

}