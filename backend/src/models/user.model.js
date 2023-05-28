class UserModel {
  constructor(uid, name, email, picture, { nickname, phoneNumber, country }) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.picture = picture;
    this.nickname = nickname || null;
    this.phoneNumber = phoneNumber || null;
    this.country = country || null;
  }

  toJson = () => {
    return {
      name: this.name,
      email: this.email,
      picture: this.picture,
      nickname: this.nickname,
      phoneNumber: this.phoneNumber,
      country: this.country,
    }
  }

  static toClass = (data) => new UserModel(
    data.uid,
    data.name,
    data.email,
    data.picture, 
    {
      nickname: data.nickname,
      phoneNumber: data.phoneNumber,
      country: data.country
    });
}

module.exports = UserModel;