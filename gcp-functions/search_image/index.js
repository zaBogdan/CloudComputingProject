/**
 * Triggered by a change to a Firestore document.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const { getRequest } = require('./requests');
const memeService = require('./meme_service');

exports.helloFirestore = (event, context) => {
  try {
    const resource = context.resource;
    // log out the resource string that triggered the function
    console.log('BZBZ Function triggered by change to: ' +  resource);
    // now log the full event object
    const uid = resource.split('/').slice(-1)[0];
    const imageUrl = event?.value?.fields?.uploadedFileUrl?.stringValue;
    console.log("uid, imageUrl",uid, imageUrl);
    const d = async () => {
      const response = await getRequest(imageUrl);
      console.log(response.data);
      const { image_url } = response.data;
      const memeFromDb = await memeService.getOneMeme(uid);
      console.log(memeFromDb);
      memeFromDb.status = 'await_description';
      memeFromDb.originalMemeUrl = image_url;
      const resp = await memeService.updateMeme(memeFromDb)
      console.log('Response update', resp);
    }

    const dAsync = d();
    return Promise.all([dAsync]);
  } catch (err) {
    console.error({
      success: false,
      message: `Failed to process request. Error: ${err}`
    });
  }
};
