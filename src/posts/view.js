import { inject } from 'aurelia-framework';
import firebase from "../firebase";
require("firebase/auth");
require("firebase/database");


@inject (firebase)
export class View {     

  constructor(firebase) {
    this.firebase = firebase;
  }

  activate(params){
    console.log('params----', params);
    const path = `posts/${params.id}`;
    this.error = '';
    const postRef = this.firebase.database().ref(path);
    postRef.on("value", (snapshot) => {
      this.post = snapshot.val();
      console.log('this.post---234', snapshot.val());
    });
  }
}
