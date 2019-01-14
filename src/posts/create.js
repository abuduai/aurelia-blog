import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import _ from "lodash";
import firebase from "../firebase";
require("firebase/auth");
require("firebase/database");

@inject(EventAggregator, firebase, Router)
export class Create {
  constructor(EventAggregator, firebase, Router) {
    this.ea = EventAggregator;
    this.firebase = firebase;
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
    this.tags = [];
    const archivesRef = this.firebase.database().ref("archives");
    const tagsRef = this.firebase.database().ref("tags");
    archivesRef.on("value", snapshot => {
      this.allArchives = snapshot.val();
    });

    tagsRef.on("value", snapshot => {
      this.allTags = snapshot.val();
      _.forEach(this.allTags, (value, key) => {
        this.tags.push(value);
      });
    });
  }

  create() {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const postsRef = this.firebase.database().ref("posts");
        const archivesRef = this.firebase.database().ref("archives");
        const tagsRef = this.firebase.database().ref("tags");
        const time = this.formatDate(new Date());
        postsRef
          .push()
          .set({
            title: this.post.title,
            body: this.post.body,
            author: user.email,
            tags: this.post.tags,
            createdAt: time
          })
          .then(() => {
            const length = this.post.tags.length;
            const isArchiveExist = _.findKey(this.allArchives, item => {
              return item === time;
            });

            if (!isArchiveExist) {
              archivesRef.push().set(time);
            } else if(length > 0) {
              _.forEach(this.post.tags, item => {
                  tagsRef.push().set(item);
              });
            } else {
              return;
            }
            this.router.navigateToRoute("home");
          })
          .catch(error => {
            console.log("Error while creating new post", error);
          });
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

  /**
   * Convert the posts object to an array for repeat.for
   */

  _toArray(obj) {
    let temp = [];
    for (let item in obj) {
      if (obj.hasOwnProperty(item)) {
        const postsList = {
          id: item,
          author: obj[item].author,
          body: obj[item].body,
          tags: obj[item].tags,
          title: obj[item].title,
          createdAt: obj[item].createdAt
        };
        temp.push(postsList);
      }
    }

    return temp;
  }
}
