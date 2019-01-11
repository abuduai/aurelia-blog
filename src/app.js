import { PLATFORM } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import firebase from "./firebase";
require("firebase/auth");
import { PostService } from "./common/services/post-service";


@inject(EventAggregator, PostService, firebase)
export class App {
  constructor(EventAggregator, PostService, firebase) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.firebase = firebase;
  }

  attached() {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user.email;
        this.subscription = this.ea.subscribe("user", () => {
          this.currentUser = user.email;
        });
      } else {
        console.log("User does not exist");
      }
    });

    this.updateSidebar();
    this.postSubscription = this.ea.subscribe("post-updated", () => {
      this.updateSidebar();
    });
  }

  updateSidebar() {
    this.postService
      .allTags()
      .then(data => {
        this.tags = data.tags;
      })
      .catch(error => {
        this.error = error.message;
      });

    this.postService
      .allArchives()
      .then(data => {
        this.archives = data.archives;
      })
      .catch(error => {
        this.error = error.message;
      });
  }

  configureRouter(config, router) {
    config.title = "'Abu's Blog";
    config.map([
      {
        route: "",
        name: "home",
        moduleId: PLATFORM.moduleName("posts/index"),
        title: "All posts"
      },
      {
        route: "login",
        name: "login",
        moduleId: PLATFORM.moduleName("auth/login"),
        title: "Login"
      },
      {
        route: "signup",
        name: "signup",
        moduleId: PLATFORM.moduleName("auth/signup"),
        title: "Sign Up"
      },
      {
        route: "create-post",
        name: "create-post",
        moduleId: PLATFORM.moduleName("posts/create"),
        title: "Create Post"
      },
      {
        route: "post/:id",
        name: "post-view",
        moduleId: PLATFORM.moduleName("posts/view"),
        title: "View post"
      },
      {
        route: "post/:id/edit",
        name: "post-edit",
        moduleId: PLATFORM.moduleName("posts/edit"),
        title: "Edit post"
      },
      {
        route: "tag/:tag",
        name: "tag-view",
        moduleId: PLATFORM.moduleName("posts/tag-view"),
        title: "View post by tag"
      },
      {
        route: "archive/:archive",
        name: "archive-view",
        moduleId: PLATFORM.moduleName("posts/archive-view"),
        title: "View post by archive"
      }
    ]);

    this.router = router;
  }

  detached() {
    this.subscription.dispose();
    this.this.postSubscription.dispose();
  }

  logout() {
   this.firebase.auth().signOut();
   this.ea.publish('user', null);
   this.currentUser = null;
  }
}
