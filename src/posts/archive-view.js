import { inject } from "aurelia-framework";
import firebase from "../firebase";
require("firebase/database");

@inject(firebase)
export class ArchiveView {
  constructor(firebase) {
    this.firebase = firebase;
  }

  activate(params) {
    this.error = "";
    this.archive = params.archive;
    this.title = `Viewing posts from ${this.archive}`;
    this.filteredPosts = [];
    const postsRef = this.firebase.database().ref("posts");
    postsRef.on("value", snapshot => {
      this.posts = this._toArray(snapshot.val());
      this.posts.map(item => {
        if (item.createdAt === this.archive) {
          this.filteredPosts.push(item);
          return this.filteredPosts;
        }
      });
    });
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
