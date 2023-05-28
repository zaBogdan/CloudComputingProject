const config = require('../module/config');
const CustomStatusCodeError = require('../errors/CustomStatusCodeError');

const memeService = require('../services/meme.service');
const MemeModel = require('../models/meme.model');
const { postRequest } = require('../module/requests');

exports.uploadImage = async (req, res, next) => {
    try{
        if (Object.keys(req.files).length > 0 && !req.files.image) {
            const error = new Error('Please upload a file that\'s an image');
            error.httpStatusCode = 400;
            return next(error);
        }
        const { image } = req.files;
        if (!image.mimetype.startsWith('image/')) {
            const error = new Error('Please upload an image file');
            error.httpStatusCode = 400;
            return next(error);
        }

        if (image.size > 3e6) {
            const error = new Error('Please upload an image less than 1MB');
            error.httpStatusCode = 400;
            return next(error);
        }
        const base64Data = image.data.toString('base64');
        const { imageId } = (await postRequest('uploadImageFunction', '', {
            imageData: base64Data,
        })).data;
        const resp = await memeService.createMeme(new MemeModel(
            null,
            req.user.uid,
            '',
            `https://storage.googleapis.com/imges_bucket/${imageId}`,
            '',
            [],
            'image_uploaded'
        ))
        return res.json({
            success: true,
            message: 'Meme added to the queue successfully',
            data: {
                meme: resp.toJson()
            },
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}