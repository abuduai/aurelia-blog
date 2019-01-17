import { inject } from "aurelia-framework";
import { _toArray } from "../helper/helper";
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
      this.posts = _toArray(snapshot.val());
      this.posts.map(item => {
        if (item.createdAt === this.archive) {
          this.filteredPosts.push(item);
          return this.filteredPosts;
        }
      });
    });
  }
}
