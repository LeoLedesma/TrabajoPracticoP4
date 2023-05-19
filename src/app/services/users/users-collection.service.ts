import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ICollectionable } from 'src/app/models/interfaces/i-collectionable';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersCollectionService implements ICollectionable<User>
{
  private users: User[] = [];

  userCollection!: CollectionReference<DocumentData>;
  userList!: Observable<User[]>;
  db!: Firestore;

  constructor(private _firestore: Firestore) {
    this.userCollection = collection(this._firestore, 'usuarios');
    this.userList = collectionData(this.userCollection) as Observable<User[]>;    
  }

  async exists(user:User): Promise<boolean> {
    let users = query(collection(this._firestore, "usuarios"), where("username", "==", user.username),where("email", "==", user.email));    
    return !(await getDocs(users)).empty;
  }


  async existsUsername(username:string): Promise<boolean> {      
    let users = query(collection(this._firestore, "usuarios"), where("username", "==", username));
    return (await getDocs(users)).empty;
  }

  async existsEmail(email:string): Promise<boolean> {      
    let users = query(collection(this._firestore, "usuarios"), where("email", "==", email));
    return (await getDocs(users)).empty;
  }

  getAll(): Observable<User[]> {return this.userList;}

  addOne(user: User): boolean {
    
      if (this.userList) {        
        let docRef: DocumentReference<DocumentData> = doc(this.userCollection);    
        user._id = docRef.id;  
        setDoc(docRef, { ...user });
        
        return true;
      }
      return false;
  }
  update(item: User): boolean {
    return true;
  }

  removeOne(user: User): boolean {
    return true;
  }

  async getOne(id: string): Promise<User> {
    let user!: User;
    let users = query(collection(this._firestore, "usuarios"), where("_idAuth", "==", id));    
    user = await getDocs(users).then(res => res.docs[0].data() as User)

    return user;
  }

}
