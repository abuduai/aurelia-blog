import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import firebase from "../firebase";
import { PostService } from "../common/services/post-service";
require("firebase/auth");
require("firebase/database");

@inject(EventAggregator, firebase, PostService, Router)
export class Create {
  constructor(EventAggregator, firebase, PostService, Router) {
    this.ea = EventAggregator;
    this.firebase = firebase;
    this.postService = PostService;
    this.router = Router;
  }

  attached() {
    this.title = "Create Post";
    this.post = {
      title: "",
      body: "",
      tags: [],
      author: ""
    };
    this.postService
      .allTags()
      .then(data => {
        this.allTags = data.tags;
      })
      .catch(error => {
        this.error = error.message;
      });
  }

  create() {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const postsRef = this.firebase.database().ref("posts");
        const time = this.formatDate(new Date());
        postsRef.push().set({
          title: this.post.title,
          body: this.post.body,
          author: user.email,
          tags: this.post.tags,
          createdAt: time
        });
        this.router.navigateToRoute("home");
      } else {
        console.log("Please login first!");
      }
    });
  }

  /**
   * Helper function to format the date
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

/* this.postService.create(this.post).then(data => {
  this.ea.publish('post-updated', Date());
  this.router.navigateToRoute('home');
}).catch(error => {
  this.error = error.message;
}) */
