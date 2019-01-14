import { inject } from 'aurelia-framework';
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
      this.posts = this._toArray(snapshot.val());
      this.posts.map(item => {
        if(item.tags.includes(this.tag)){
          this.filteredPosts.push(item);
          return this.filteredPosts;
        }
      })
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