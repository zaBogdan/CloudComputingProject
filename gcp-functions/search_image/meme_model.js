class MemeModel {
  constructor(uid, userUid, description, uploadedFileUrl, originalMemeUrl, tags, status) {
    this.uid = uid;
    this.userUid = userUid;
    this.description = description;
    this.uploadedFileUrl = uploadedFileUrl;
    this.originalMemeUrl = originalMemeUrl;
    this.tags = tags;

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
      description: this.description,
      uploadedFileUrl: this.uploadedFileUrl,
      originalMemeUrl: this.originalMemeUrl,
      tags: this.tags,
      status: this.status
    }
  }

  static toClass = (data) => new MemeModel(
    data.uid,
    data.userUid,
    data.description,
    data.uploadedFileUrl,
    data.originalMemeUrl,
    data.tags,
    data.status,
  );
}

module.exports = MemeModel;