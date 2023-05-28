const CustomStatusCodeError = require('../errors/CustomStatusCodeError');

class MemeModel {
  // description is deprecated, use tags instead
  constructor(uid, userUid, description, uploadedFileUrl, originalMemeUrl, tags, status) {
    this.uid = uid;
    this.userUid = userUid;
    this.uploadedFileUrl = uploadedFileUrl;
    this.originalMemeUrl = originalMemeUrl;
    this.tags = tags;
    this.description = "<deprecated> don't use!";

    if (![
      'pending',
      'image_uploaded',
      'searching',
      'await_description',
      'done',
    ].includes(status)) {
      this.status = 'pending';
    } else {
      this.status = status;
    }
  }

  toJson = () => {
    return {
      userUid: this.userUid,
      uploadedFileUrl: this.uploadedFileUrl,
      originalMemeUrl: this.originalMemeUrl,
      description: this.description,
      tags: this.tags,
      status: this.status
    }
  }

  static toClass = (data) => new MemeModel(
    data.uid,
    data.userUid,
    '<deprecated>',
    data.uploadedFileUrl,
    data.originalMemeUrl,
    data.tags,
    data.status,
  );
}

module.exports = MemeModel;