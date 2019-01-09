import { inject } from 'aurelia-framework';
import { PostService } from '../../common/services/post-service';
import {bindable} from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';


@inject (PostService, ValidationControllerFactory)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(PostService, ValidationControllerFactory) {
    this.postService = PostService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
  }

  attached(){
    this.postService.allTags().then(data => {
        this.allTags = data.tags;
    }).catch(error => {
        this.error = error.message;
    })
  }

  addTag(){
    this.allTags.push(this.newtag);
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

