import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { alertType } from 'src/app/models/enums/alertType';
import { ModeSignIn } from 'src/app/models/enums/mode-sign-in';
import { IResponse } from 'src/app/models/interfaces/response';
import { UserAuth, UserRegister } from 'src/app/models/user';
import { emailExistsAsyncValidator, usernameExistsAsyncValidator } from 'src/app/models/validators/asyncUserValidators';

import { EventsService } from 'src/app/services/events.service';
import { UsersService } from 'src/app/services/users/users.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  @Input() onModalCloseIn: EventEmitter<void> = new EventEmitter();
  modo: ModeSignIn = ModeSignIn.Login;
  form!: FormGroup;
  errorMessage: string = '';

  constructor(private eventService: EventsService,
    private usersService: UsersService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.onModalCloseIn.subscribe(() => this.closeModal());
    this.form = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email],updateOn: 'blur'}),
      password: new FormControl('', {validators: Validators.required,updateOn: 'blur'}),
    });
  }

  //#region getters
  get titulo() { return this.modo == ModeSignIn.Login ? "Iniciar Sesión" : "Registrarse" };
  get alternativa() { return this.modo == ModeSignIn.Login ? "Registrarse" : "Ya tengo cuenta" };
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get usuario() { return this.form.get('usuario'); }
  //#endregion

  closeModal() { this.eventService.onSwapSignInModal.emit() }

  swapMode() {
    this.modo = this.modo == ModeSignIn.Login ? ModeSignIn.Register : ModeSignIn.Login;

    if (this.modo == ModeSignIn.Register) {

      this.form = new FormGroup({
        usuario: new FormControl('', { asyncValidators: usernameExistsAsyncValidator(this.usersService), updateOn: 'blur', }),
        email: new FormControl('', { asyncValidators: emailExistsAsyncValidator(this.usersService), updateOn: 'blur', }),
        password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
        confirmPassword: new FormControl('', {validators: [Validators.required, this.passwordMatchValidator.bind(this)], updateOn: 'blur'})
      });
      this.email?.setValidators([Validators.required, Validators.email]);
    }
    else {
      this.form = new FormGroup({
        email: new FormControl('', {validators: [Validators.required, Validators.email],updateOn: 'blur'}),
        password: new FormControl('', {validators: Validators.required,updateOn: 'blur'}),
      });
    }
  }

  passwordMatchValidator(control: AbstractControl): null | object {    
    return this.password?.value === control.value ? null : { passwordUnmatch: true }
  }

  async submitForm() {
    try {
      this.errorMessage = '';
      let resp!: IResponse;
      if (this.form.valid) {
        if (this.modo == ModeSignIn.Login) {
          const user = this.armarUsuarioLogin()
          resp = await this.usersService.signIn(user);

        } else {
          const user = this.armarUsuarioRegister()
          resp = await this.usersService.register(user);          
          resp = resp.valid ? await this.usersService.signIn(this.armarUsuarioLogin()) : resp;
        }
        
        if (resp.valid) {
          this.eventService.onShowAlertSuccess.emit({ alertType: alertType.success, message: resp.message })
        }
        else {
          this.eventService.onShowAlertSuccess.emit({ alertType: alertType.danger, message: resp.message })
        }
      } else {
        this.errorMessage = "Los campos son obligatorios";
      }


    } catch (ex) {
      this.errorMessage = "Hubo un error al intentar iniciar sesión, intenta más tarde";
      
      if (ex instanceof FirebaseError) {
        switch (ex.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            this.errorMessage = "El usuario o contraseña ingresada es incorrecto."
            break;
          case "auth/invalid-email":
            this.errorMessage = "El correo ingresado no es válido"
            break;
          case "auth/too-many-requests":
            this.errorMessage = "Has excedido el limite de intentos de inicio de sesión"
            break;
        }

        this.password?.setValue('');
        this.confirmPassword?.setValue('');        
      }
    }

  }

  armarUsuarioLogin(): UserAuth {
    return new UserAuth(this.email?.value, this.password?.value);
  }

  armarUsuarioRegister(): UserRegister {
    return new UserRegister(this.email?.value, this.password?.value, this.usuario?.value);
  }

  fastAccess()
  {
    this.email?.setValue('admin@mail.com')
    this.password?.setValue('administrador')
  }

}
