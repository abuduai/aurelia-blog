import { inject } from 'aurelia-framework';
import firebase from '../firebase';
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
      this.posts = this._toArray(snapshot.val());
    });
  }
  /**
   * Convert the posts object to an array for repeat.for
   */

   _toArray(obj){
     let temp = [];
     for (let item in obj) {
       if(obj.hasOwnProperty(item)){
         const postsList = {
           id: item,
           author: obj[item].author,
           body: obj[item].body,
           tags: obj[item].tags,
           title: obj[item].title,
           createdAt: obj[item].createdAt
         }
         temp.push(postsList);
       }
     }

     return temp;
   }
}