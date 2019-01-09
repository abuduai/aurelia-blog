import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostService } from '../common/services/post-service';

@inject(EventAggregator, PostService, Router)
export class Create {     
  constructor(EventAggregator, PostService, Router) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.router = Router;
    
  }

  attached(){
    this.title ="Create Post";
    this.post = {
      title: '',
      body: '',
      tags: []
    }
    this.postService.allTags().then(data => {
        this.allTags = data.tags;
    }).catch(error => {
        this.error = error.message;
    })
  }

  create(){
    this.postService.create(this.post).then(data => {
      this.ea.publish('post-updated', Date());
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    })
  }
}