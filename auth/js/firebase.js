const firebaseConfig = {
  apiKey: "AIzaSyA_PHdUDzIp2e4xo95wgvGiwAeFGMCMfnU",
  authDomain: "schoolblog-9886b.firebaseapp.com",
  projectId: "schoolblog-9886b",
};

firebase.initializeApp(firebaseConfig);

// SAFE INIT (prevents duplicate error)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();