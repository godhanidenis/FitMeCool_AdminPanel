import { destinationBucketName, s3 } from "../wasabi/config";

export const deleteObjectsInFolder = async (folderPrefix) => {
  const params = {
    Bucket: destinationBucketName,
    Prefix: "seller/" + folderPrefix,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();

    const objects = data.Contents;

    if (objects.length === 0) {
      console.log("No objects found in the specified folder.");
      return;
    }

    const deleteParams = {
      Bucket: destinationBucketName,
      Delete: {
        Objects: objects.map(({ Key }) => ({ Key })),
        Quiet: false,
      },
    };

    await s3.deleteObjects(deleteParams).promise();

    console.log(`Objects in folder '${folderPrefix}' deleted successfully.`);
  } catch (error) {
    console.error("Error deleting objects:", error);
  }
};
