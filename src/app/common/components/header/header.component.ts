import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { User} from '../../../models/user';
import { UsersService } from '../../../services/users/users.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`  
  li:hover{cursor: pointer;}
  `]
})
export class HeaderComponent implements OnInit{

  isSignedIn:boolean = false;
  currentUser!: User


  constructor(private eventService: EventsService,
              private usersService:  UsersService){}
  ngOnInit(): void {
    this.usersService.onSignIn.subscribe(user => {
      this.isSignedIn = true;
      this.currentUser = user;      
    })
    this.usersService.onSignOut.subscribe(() => {this.onSignOut()})
    
  }
  openModalSignIn(){this.eventService.onSwapSignInModal.emit();}
  signOut(){this.usersService.signOut()}

  onSignOut(){
    this.isSignedIn = false;
    this.currentUser = this.usersService.getEmptyUser();
  }
  
}
