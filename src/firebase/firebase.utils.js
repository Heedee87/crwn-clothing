import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDVeH3i9BQzvfSLJgXSVXz4YkEuoo5VzlI",
  authDomain: "crwn-db-380a0.firebaseapp.com",
  databaseURL: "https://crwn-db-380a0.firebaseio.com",
  projectId: "crwn-db-380a0",
  storageBucket: "crwn-db-380a0.appspot.com",
  messagingSenderId: "949059293514",
  appId: "1:949059293514:web:8462c2bf325b11843ef1b3",
  measurementId: "G-K3FNB2SG2T"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
