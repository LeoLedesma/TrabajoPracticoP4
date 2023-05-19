import { EventEmitter, Injectable } from '@angular/core';
import { UserAuth } from '../models/user';
import { alertType } from '../models/enums/alertType';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public onSwapSignInModal = new EventEmitter<void>();  
  public onShowAlertSuccess = new EventEmitter<{alertType:alertType,message:string}>();
  
  constructor() { }

  public showAlert(alertType:alertType,message:string){
    this.onShowAlertSuccess.emit({alertType,message});  
  }
}
