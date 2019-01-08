import { inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { AuthService } from '../common/services/auth-service';

@inject(EventAggregator, AuthService, Router)
export class Signup {     
  constructor(EventAggregator, AuthService, Router) {
    this.ea = EventAggregator;
    this.authService = AuthService;
    this.router = Router;
  }

  signup(){
    this.authService.signup(this.name).then(data => {
      this.ea.publish('user', data.name);
      this.router.navigateToRoute('home');
    
    }).catch(error => {
      this.error = error.message
    });

  }
}