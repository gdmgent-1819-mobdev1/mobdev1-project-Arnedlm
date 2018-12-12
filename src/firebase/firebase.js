const firebaseInstance = require('firebase');

// Initialize Firebase
// TODO: Replace with your project's config
const config = {
  apiKey: "AIzaSyCDYums8E3JQH3UdeLowGnxuVeyLqLlUbA",
  authDomain: "werkstuk-1ecd2.firebaseapp.com",
  databaseURL: "https://werkstuk-1ecd2.firebaseio.com",
  projectId: "werkstuk-1ecd2",
  storageBucket: "werkstuk-1ecd2.appspot.com",
  messagingSenderId: "563313560367"
};

let instance = null;

const initFirebase = () => {
  instance = firebaseInstance.initializeApp(config);
};

const getInstance = () => {
  if (!instance) {
    initFirebase();
  }
  return instance;
};
export {
  initFirebase,
  getInstance,
};
