// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcIPcu36w6RHX7TWmWR06Ved0S8uvNWq8",
  authDomain: "crwn-clothing-db-eac41.firebaseapp.com",
  projectId: "crwn-clothing-db-eac41",
  storageBucket: "crwn-clothing-db-eac41.appspot.com",
  messagingSenderId: "386926620293",
  appId: "1:386926620293:web:2779f0b64291a3699f83ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Instantiate google provider.
// The reason why we use new keyword "new" is because it is actually a class and we might want
// more than 1 provider. Whereas with auth, we only need 1 auth for our app
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// create an instance of our firestore
const db = getFirestore(app);

// create an instance of our auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // docRef is basically the reference or where the document is living
  // it always returns value even though there's no such document inside our database.
  // The reason why is so that we can easily set document inside it using setDoc and just passing
  // this reference
  const userDocRef = doc(db, "users", userAuth.uid);

  // using that reference, we use getDoc to read the document inside the reference
  const userSnapshot = await getDoc(userDocRef);

  // there's a method to check whether there's document inside the reference.
  // we can simply use it to check if there's already user id in the database
  // if not then we create the user inside the reference.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // set document inside the reference we got using doc method
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
