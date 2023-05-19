import { Injectable } from '@angular/core';
import { logEventType } from 'src/app/models/enums/logEventType';
import { CollectionsService } from '../collections.service';
import { Log } from 'src/app/models/log';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private collectionName:string = 'logs';
  constructor(private collectionService: CollectionsService) { }

  write(entity: string, eventType:logEventType, content: string) {
    this.collectionService.addOne(this.collectionName, this.createLog(entity, eventType, content));
  }

  createLog(entity: string, eventType:logEventType, content: string){
    return new Log('', entity, eventType, content, Timestamp.now());  
  }
}
