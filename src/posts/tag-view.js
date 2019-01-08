import { inject } from 'aurelia-framework';
import { PostService } from '../common/services/post-service';

@inject (PostService)
export class TagView {    

  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params){
    this.error = '';
    this.tag = params.tag;
    this.title = `Viewing posts by ${this.tag}`
    this.postService.postsByTag(this.tag).then(data => {
        this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    })
  }


}