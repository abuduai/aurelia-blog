import { inject } from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import _ from "lodash";
import firebase from "../../firebase";
require("firebase/database");
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';


@inject (firebase, ValidationControllerFactory)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(firebase, ValidationControllerFactory) {
    this.firebase = firebase;
    this.controller = ValidationControllerFactory.createForCurrentScope();
  }

  attached(){
    this.tags = [];
    const tagsRef = this.firebase.database().ref("tags");

    tagsRef.on("value", snapshot => {
      this.allTags = snapshot.val();
      _.forEach(this.allTags, (value, key) => {
        this.tags.push(value);
      });
    });
  }

  addTag(){
    this.tags.push(this.newtag);
    this.post.tags.push(this.newtag);
    this.newtag = '';
  }

  submit(){

  }

  postChanged(newValue, oldValue) {
    if(this.post){
      validationMessages['required'] = `You must enter a \${$displayName}`;
    ValidationRules
    .ensure('title').displayName('Title')
    .required().minLength(3)
    .ensure('body').displayName('Body')
    .required().minLength(10)
    .on(this.post);

    this.controller.validate();
    }
  }
}

