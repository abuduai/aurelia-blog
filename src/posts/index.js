import { inject } from 'aurelia-framework';
import firebase from '../firebase';
import {_toArray } from "../helper/helper";
require("firebase/auth");
require("firebase/database");

@inject (firebase)
export class Index { 

  constructor(firebase) {
    this.firebase = firebase;
  }

  attached(){
    this.error = '';
    this.title= 'Welcome to home page!';

    const postsRef = this.firebase.database().ref('posts');
    postsRef.on("value", (snapshot) => {
      this.posts = _toArray(snapshot.val());
    });
  }
}