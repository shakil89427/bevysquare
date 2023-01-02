const crypto = require("crypto");
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

module.exports = async (file, containerName) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_BLOB_STORAGE_NAME,
    process.env.AZURE_BLOB_STORAGE_KEY
  );
  const blobServiceClient = new BlobServiceClient(
    process.env.AZURE_BLOB_STORAGE_URL,
    sharedKeyCredential
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(
    crypto.randomBytes(32).toString("hex") + file.name
  );
  await blobClient.uploadData(file.data, {
    blobHTTPHeaders: { blobContentType: file.type },
  });
  return blobClient.url;
};
