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
  const data = await memeService.getAllMemes();
  const promises = data.map(async (meme) => {
    const response = await getRequest(meme.uploadedFileUrl);
    console.log(response);
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