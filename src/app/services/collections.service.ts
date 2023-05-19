import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  
  constructor(private _firestore: Firestore) {
  }

  getCollection(collectionName:string):CollectionReference<DocumentData>{    
    let userCollection: CollectionReference<DocumentData> = collection(this._firestore, collectionName);
    return userCollection;
  }      

  getCollectionList(collectionName:string){    
      return collectionData(this.getCollection(collectionName)) as Observable<any>; 
  }   
  
  addOne(collectionName:string, data:any){ 
    if (this.getCollectionList(collectionName)) {
      let docRef: DocumentReference<DocumentData> = doc(this.getCollection(collectionName)); 
      data.id=docRef.id;     
      setDoc(docRef, { ...data });
      return true;
    }     
    return false;
  }

}

