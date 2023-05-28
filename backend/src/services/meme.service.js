const { firebase } = require('../utils');
const MemeModel = require('../models/meme.model');
const db = firebase.database;

const COLLECTION_NAME = 'memes';
const COLLECTION_MODEL = MemeModel;

class MemeService {

    static getOneMeme = async (uid) => {
      const userRef = db.collection(COLLECTION_NAME).doc(uid);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return null;
      }
      return COLLECTION_MODEL.toClass({
        ...userDoc.data(),
        uid,
      });
    }
  
    static getAllMemes = async (userUid) => {
      const usersRef = db.collection(COLLECTION_NAME);
      const users = await usersRef.where("userUid", "==", userUid).get();
      if (users.empty) {
        return [];
      }
      const usersArray = [];
      users.forEach((user) => {
        usersArray.push(COLLECTION_MODEL.toClass({
          ...user.data(),
          uid: user.id,
        }));
      });
      return usersArray;
    }
  
    static createMeme = async (data) => {
      const memeRef = db.collection(COLLECTION_NAME);
      await memeRef.add(data.toJson())
      return data;
    }
  
    static updateMeme = async (data) => {
      const memeRef = db.collection(COLLECTION_NAME).doc(data.uid);
      const userDoc = await memeRef.get();
      if (!userDoc.exists) {
        return null;
      }
      await memeRef.update(data.toJson());
      return data;
    }
  
    static deleteMeme = async (uid) => {
      const memeRef = db.collection(COLLECTION_NAME).doc(uid);
      const userDoc = await memeRef.get();
      if (!userDoc.exists) {
        return null;
      }
      await memeRef.delete();
      return userDoc.data();
    }
}

module.exports = MemeService;