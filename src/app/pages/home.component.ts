import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventsService } from '../services/events.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})
export class HomeComponent {
  showModalSignIn: boolean = false;
  
  constructor(private eventService: EventsService,
            private usersService: UsersService) { }


  ngOnInit() {
    this.eventService.onSwapSignInModal.subscribe(() => this.SwapModalSignIn());
    this.usersService.setUserFromStorage();
    this.usersService.onSignIn.subscribe(() => this.SwapModalSignIn());     
  }

  SwapModalSignIn() { this.showModalSignIn = !this.showModalSignIn;}
}
