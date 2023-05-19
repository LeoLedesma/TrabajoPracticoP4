import { EventEmitter, Injectable } from '@angular/core';
import { User, UserAuth, UserRegister } from '../../models/user';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { UsersCollectionService } from './users-collection.service';
import { LoggerService } from '../logger/logger.service';
import { alertType } from 'src/app/models/enums/alertType';
import { EventsService } from '../events.service';
import { FirebaseError } from 'firebase/app';
import { IResponse } from 'src/app/models/interfaces/response';
import { logEventType } from 'src/app/models/enums/logEventType';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public isSignedIn: boolean = false;
  public currentUser!: User;

  public onSignIn = new EventEmitter<User>();
  public onSignOut = new EventEmitter<void>();

  constructor(private auth: Auth,
    private usersCollection: UsersCollectionService,
    private usersLogger: LoggerService,
    private eventService: EventsService,
    private route:Router) {
          this.setUserFromStorage();
     }

  async signIn(user: UserAuth): Promise<IResponse> {

      const userCredential = await signInWithEmailAndPassword(this.auth, user.email, user.password);
      this.currentUser = await this.usersCollection.getOne(userCredential.user.uid);

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      
      this.isSignedIn = true;
      this.onSignIn.emit(this.currentUser);      
      
      this.route.navigate(['/']);
      return this.getOkLoginMessage();
  }

  async register(user: UserRegister): Promise<IResponse> {
    let returns!: IResponse;
    try {
      //Registro el usuario en el servicio de Auth
      if (await this.usersCollection.exists(new User('','',user.email,user.username))) {            
        return this.getAlreadyExistsUsernameMessage();
      }

      const userRegister = await createUserWithEmailAndPassword(
        this.auth,
        user.email,
        user.password
      );
      
      const userRegistered: User = new User('', userRegister.user.uid, user.email, user.username);

      if (userRegister) {        
        if (this.usersCollection.addOne(userRegistered)) {      
          returns = this.getOkRegisterMessage();          
        }else{
          returns = this.getErrorRegisterMessage();
        }
      }
    } catch(ex) {        
      returns = this.getErrorRegisterMessage();
    } finally {      
      this.usersLogger.write('Users',logEventType.errorSignUp,user.username);      
      return returns;
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
    this.usersLogger.write('Users',logEventType.signIn,this.currentUser.username);
    this.currentUser = this.getEmptyUser();
    localStorage.removeItem('currentUser');
    this.isSignedIn = false;
    this.eventService.onShowAlertSuccess.emit({ alertType: alertType.success, message: 'Sesión cerrada exitosamente' })
    this.onSignOut.emit();
  }

  getEmptyUser(): User {
    return new User('', '', '', '');
  }

  setUserFromStorage(){
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    if (user) {
      this.currentUser = user;
      this.isSignedIn = true;
      this.onSignIn.emit(this.currentUser);
    }  
  }

  getErrorLoginMessage(): IResponse {return { message: "Error al iniciar sesión", valid: false }}
  getErrorRegisterMessage(): IResponse {return { message: "Error al registrar el usuario.", valid: false }}
  getOkLoginMessage(): IResponse {return { message: "Inicio de sesión exitoso", valid: true }}
  getOkRegisterMessage(): IResponse {return { message: "Usuario registrado exitosamente", valid: true }}
  getAlreadyExistsUsernameMessage(): IResponse {return { message: "El nombre de usuario ya existe", valid: false }}

  async existsUsername(username: string): Promise<boolean> {    
    return this.usersCollection.existsUsername(username)
  }

  async existsEmail(email: string): Promise<boolean> {    
    return this.usersCollection.existsEmail(email)
  }
}
