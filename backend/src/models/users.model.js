const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function(next) {
    this.username = this.username.toLowerCase();
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});
UserSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;