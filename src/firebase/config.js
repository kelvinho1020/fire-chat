import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY || "api-key-not-set",
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || "env-not-set",
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || "env-not-set",
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || "env-not-set",
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || "env-not-set",
	appId: process.env.VUE_APP_FIREBASE_APP_ID || "env-not-set",
};
console.log(process.env.VUE_APP_API_KEY);
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const projectDatabase = firebase.database();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, projectStorage, projectDatabase, timestamp };
