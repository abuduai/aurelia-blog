import { inject } from 'aurelia-framework';
import { _toArray} from "../helper/helper";
import firebase from "../firebase";
require("firebase/database");

@inject (firebase)
export class TagView {    

  constructor(firebase) {
    this.firebase = firebase;
  }

  activate(params){
    this.error = '';
    this.filteredPosts = [];
    this.tag = params.tag;
    this.title = `Viewing posts by ${this.tag}`
    const postsRef = this.firebase.database().ref('posts');
    postsRef.on("value", (snapshot) => {
      this.posts = _toArray(snapshot.val());
      this.posts.map(item => {
        if(item.tags.includes(this.tag)){
          this.filteredPosts.push(item);
          return this.filteredPosts;
        }
      })
    });
    
  }

}