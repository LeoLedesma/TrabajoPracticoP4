import { Component, Input, OnInit } from '@angular/core';
import { alertType } from 'src/app/models/enums/alertType';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{
  
  constructor(private eventsService:EventsService) {        
  }
  ngOnInit(): void {
    this.eventsService.onShowAlertSuccess.subscribe((showAlert) => {this.alert(showAlert)})
  }

  showAlert: boolean = false;  
  alertMessage: string = '';
  alertType: alertType = alertType.success;
  
  swapAlert(){this.showAlert = !this.showAlert}
  alert(show:{message:string, alertType:alertType}){
    this.alertMessage = show.message;
    this.alertType = show.alertType;
    this.swapAlert();

    setTimeout(() => {
      this.swapAlert();
  },5000);
  }
}
