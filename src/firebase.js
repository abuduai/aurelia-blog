import firebase from "firebase/app";

const config = {
    apiKey: "AIzaSyBvjulH0zWQ-a-Hvkq1rVuHM93LR6aOqtM",
    authDomain: "aurelia-blog-3c67b.firebaseapp.com",
    databaseURL: "https://aurelia-blog-3c67b.firebaseio.com",
    projectId: "aurelia-blog-3c67b",
    storageBucket: "aurelia-blog-3c67b.appspot.com",
    messagingSenderId: "717429323182"
};

export default firebase.initializeApp(config);