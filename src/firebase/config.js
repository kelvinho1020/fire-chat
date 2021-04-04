import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCE8ygKv4AVrpjhJJVqlcniv2D17fEI0k4",
	authDomain: "firechat-d684b.firebaseapp.com",
	projectId: "firechat-d684b",
	storageBucket: "firechat-d684b.appspot.com",
	messagingSenderId: "808090669138",
	appId: "1:808090669138:web:73433ef718103d26198f8b",
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
