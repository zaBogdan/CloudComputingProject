/**
 * Triggered by a change to a Firestore document.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const { getRequest } = require('./requests');
const memeService = require('./meme_service');

const functions = require('@google-cloud/functions-framework');

const imageHandler =  async (req, res) => {
  const modifiedIds = [];
  const data = await memeService.getAllMemes();

  const promises = data.map(async (meme) => {
    try {
      const imageId = meme.uploadedFileUrl.split('/').slice(-1)[0];
      const response = await getRequest(imageId);
      meme.tags = response.data.description;
      meme.status = 'done';
      const resp = await memeService.updateMeme(meme);
      if (resp) {
        modifiedIds.push(meme.uid);
      }
    } catch (err) {
      console.log("Failed to update",err);
    }
  });

  await Promise.all(promises);
  return res.json({
    success: true,
    message: 'Successfully got all images updated!',
    data: data.map((meme) => meme.uid),
  });
}
functions.http('helloHttp',imageHandler);

imageHandler();