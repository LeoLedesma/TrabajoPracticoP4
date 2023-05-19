import { Component } from '@angular/core';
import { alertType } from 'src/app/models/enums/alertType';
import { CollectionsService } from 'src/app/services/collections.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-contactame',
  templateUrl: './contactame.component.html',  
})
export class ContactameComponent {
  constructor(private collectionsService:CollectionsService,private eventsService:EventsService){}
    formData = {
      name: '',
      email: '',
      message: ''
    };
  
    submitForm() {      
      if(this.collectionsService.addOne('contactame',this.formData)){
          this.eventsService.showAlert(alertType.success,'Mensaje enviado correctamente')
          this.formData = {email:'',name:'',message:''}
      }
    }


  }

