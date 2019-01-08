import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PostService } from '../common/services/post-service';

@inject(PostService, Router)
export class Create {     
  constructor(PostService, Router) {
    this.postService = PostService;
    this.router = Router;
  }

  create(){
    this.post = {
      title: this.title,
      body: this.body
    }
    this.postService.create(this.post).then(data => {
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    })
  }
}