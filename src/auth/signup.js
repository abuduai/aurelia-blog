import { inject} from 'aurelia-framework';
import firebase from "../firebase";
require('firebase/auth');
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';


@inject(EventAggregator, firebase, Router)
export class Signup {     
  constructor(EventAggregator, firebase, Router) {
    this.ea = EventAggregator;
    this.firebase = firebase;
    this.router = Router;
    this.user = {
      email: '',
      password: ''
    }
  }

  signup(){
    this.firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(user => {
      this.ea.publish('user', user.email);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    });

  }
}