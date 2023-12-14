import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_WASABI_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_WASABI_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_WASABI_REGION,
  endpoint: process.env.REACT_APP_WASABI_ENDPOINT,
});

export const s3 = new AWS.S3();

export const destinationBucketName =
  process.env.REACT_APP_WASABI_DESTINATION_BUCKET_NAME;
