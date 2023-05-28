const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');

// Instantiates a client
const storage = new Storage();

exports.uploadImage = async (req, res) => {
  // Extract the image data from the request
  const imageData = req.body.imageData;
  // Generate a UUID for the image
  const imageId = uuidv4();

  // Save the image to a Google Cloud Storage bucket
  const bucketName = 'imges_bucket';
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(imageId);
  await file.save(Buffer.from(imageData, 'base64'), { contentType: 'image/jpeg' });

  // Return the UUID of the saved image
  res.status(200).json({imageId});
};