/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

exports.getTextSentiment = async (req, res) => {
  try {
    let {message} = req.body;
    if (message.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Message too long'
      });
    }

    const document = {
      content: message,
      type: 'PLAIN_TEXT',
    };

    const [result] = await client.analyzeSentiment({document});
    const sentiment = result.documentSentiment;

    return res.status(200).json({
      success: true,
      message: 'Message translated successfully',
      data: {
        sentiment
      }
    });

  } catch(err) {
    return res.status(500).json({
      success: false,
      message: `Request failed with error: ${err}`
    });
  }
};
