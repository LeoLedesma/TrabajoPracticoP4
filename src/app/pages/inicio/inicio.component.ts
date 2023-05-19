import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'  
})
export class InicioComponent implements OnInit{

  showSignIn:boolean = false;
  constructor(private eventService: EventsService, private userService: UsersService){}
  ngOnInit(): void {
    this.userService.onSignIn.subscribe(() => {this.showSignIn = false})
    this.showSignIn = !this.userService.isSignedIn;    
  }

  emitSwapSignInModal(){this.eventService.onSwapSignInModal.emit();}
}
