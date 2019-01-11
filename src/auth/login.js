import { inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import firebase from '../firebase';;
require('firebase/auth');


@inject(EventAggregator, firebase, Router )
export class Login {     
  constructor(EventAggregator, firebase, Router) {
    this.ea = EventAggregator;
    this.firebase = firebase;
    this.router = Router;
  }

  activated(){
    this.error = null;
  }

  login(){
    this.firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(user => {
      this.ea.publish('user', user.email);
      this.router.navigateToRoute('home');
      console.log('login user details---', user);
    }).catch(e => {
      this.error = e.message;
    })
  }
}
