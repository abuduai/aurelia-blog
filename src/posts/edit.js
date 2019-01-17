import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { createTime } from "../helper/helper";
import firebase from "../firebase";
require("firebase/auth");
require("firebase/database");


@inject(EventAggregator, firebase, Router)
export class Edit {     
  constructor(EventAggregator, firebase, Router) {
    this.ea = EventAggregator;
    this.firebase = firebase;
    this.router = Router;
  }

  attached(){
    this.title = 'Edit Post';
  }

  activate(params){
    this.postId = params.id;
    const path = `posts/${params.id}`;
    this.error = '';
    const postRef = this.firebase.database().ref(path);
    postRef.on("value", (snapshot) => {
      this.post = snapshot.val();
    });
  }

  edit(){
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let updates = {};
        const time = createTime();
        this.post.createdAt = time;
        updates[`posts/${this.postId}`] = this.post;
        
        return this.firebase.database().ref().update(updates).then(() => {
          this.router.navigateToRoute("home");
        }).catch(error => {
          console.log('Error in updating the post', error);
        })
        
      } else {
        console.log("Please login first!");
      }
    });
  }
}