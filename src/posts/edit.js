import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
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
        const time = this.formatDate(new Date());
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

  /* Helper function to format the date
  * @param {*} date
  */
 formatDate(date) {
   var monthNames = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December"
   ];
   var monthIndex = date.getMonth();
   var year = date.getFullYear();

   return monthNames[monthIndex] + " " + year;
 }
}