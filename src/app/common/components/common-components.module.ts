import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SquaresComponent } from './squares/squares.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContactameComponent } from '../../pages/contactame/contactame.component';
import { SobreMiComponent } from '../../pages/sobre-mi/sobre-mi.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatoPipe } from 'src/app/pipes/formato.pipe';
import { AlertComponent } from './alert/alert.component';
import { HeaderDropdownComponent } from './header-dropdown/header-dropdown.component';
import { ValidInputComponent } from './valid-input/valid-input.component';

@NgModule({
  declarations: [
    ContactameComponent,    
    FooterComponent,
    HeaderComponent,
    ModalComponent, 
    SquaresComponent,
    SobreMiComponent,
    SignInComponent,        
    FormatoPipe,    
    AlertComponent,
    HeaderDropdownComponent,
    ValidInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,    
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SquaresComponent,
    FooterComponent,
    HeaderComponent,
    ContactameComponent,
    SobreMiComponent,   
    SignInComponent,    
    AlertComponent,    
  ],
})
export class CommonComponentsModule { }
