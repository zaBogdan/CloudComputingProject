const { firebase } = require('../utils');
const UserModel = require('../models/user.model');
const db = firebase.database;

const COLLECTION_NAME = 'profile';
const COLLECTION_MODEL = UserModel;

class UserService {

    static getOneUser = async (uid) => {
      const userRef = db.collection(COLLECTION_NAME).doc(uid);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return null;
      }
      return UserModel.toClass({
        ...userDoc.data(),
        uid,
      });
    }
  
    static getAllUsers = async () => {
      const usersRef = db.collection(COLLECTION_NAME);
      const users = await usersRef.get();
      if (users.empty) {
        return [];
      }
      const usersArray = [];
      users.forEach((user) => {
        usersArray.push(UserModel.toClass({
          ...user.data(),
          uid: user.id,
        }));
      });
      return usersArray;
    }
  
    static createUser = async (data) => {
      const userRef = db.collection(COLLECTION_NAME).doc(data.uid);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        return null;
      }
      console.log(data.toJson())
      await userRef.set(data.toJson());
      return data;
    }
  
    static updateUser = async (data) => {
      const userRef = db.collection(COLLECTION_NAME).doc(data.uid);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return null;
      }
      await userRef.update(data.toJson());
      return data;
    }
  
    static deleteUser = async (uid) => {
      const userRef = db.collection(COLLECTION_NAME).doc(uid);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return null;
      }
      await userRef.delete();
      return userDoc.data();
    }
}

module.exports = UserService;