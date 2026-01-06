
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { initializeFirestore, getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
// To use Analytics: import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// These environment variables need to be set in your .env file.
// You can find these values in your Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyD-wjc-hCFo_N7l5CsrYx8seL7yZu19xe8",
  authDomain: "gwd-malappuram.firebaseapp.com",
  projectId: "gwd-malappuram",
  storageBucket: "gwd-malappuram.appspot.com",
  messagingSenderId: "164289161362",
  appId: "1:164289161362:web:f4855e5f8aa1ae8ecb5e4b"
};

// Initialize Firebase
// We check if apps are already initialized to prevent errors during hot reloading in development.
let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

// Initialize Firestore with long polling to avoid gRPC issues in some bundler environments.
const db: Firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  ignoreUndefinedProperties: true, // This can help with some data sanitization issues
});

const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app);

// Example for Firebase Analytics (optional):
// let analytics: Analytics | undefined;
// if (typeof window !== 'undefined') { // Ensure it runs only on the client
//   isSupported().then(yes => { // Check if Firebase Analytics is supported in the current environment
//     if (yes) {
//       analytics = getAnalytics(app);
//     }
//   });
// }

export { app, auth, db, storage /*, analytics */ };
