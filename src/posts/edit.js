import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostService } from '../common/services/post-service';


@inject(EventAggregator, PostService, Router)
export class Edit {     
  constructor(EventAggregator, PostService, Router) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.router = Router;
    
    this.title = 'Edit Post';
    
  }

  activate(params){
    this.postService.find(params.id).then(data => {
        this.post = data.post;
    }).catch(error => {
        this.error = error.message;
    });
  }

  edit(){
    this.postService.update(this.post).then(data => {
      this.ea.publish('post-updated', Date());
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    })
  }
}