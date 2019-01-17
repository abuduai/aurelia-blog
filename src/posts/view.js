import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import firebase from "../firebase";
require("firebase/auth");
require("firebase/database");

@inject(firebase, Router)
export class View {
  constructor(firebase, Router) {
    this.firebase = firebase;
    this.router = Router;
  }

  attached() {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.email;
      } else {
        this.currentUser = null;
      }
    });
  }

  activate(params) {
    this.postId = params.id;
    const path = `posts/${params.id}`;
    this.error = "";
    const postRef = this.firebase.database().ref(path);
    postRef.on("value", snapshot => {
      this.post = snapshot.val();
    });
  }

  deletePost(postId) {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.path = `posts/${postId}`;

        return this.firebase
          .database()
          .ref(this.path)
          .remove()
          .then(() => {
            this.router.navigateToRoute("home");
          })
          .catch(error => {
            console.log("Error while deleting post", error);
          });
      } else {
        console.log("Please login first!");
      }
    });
  }
}
