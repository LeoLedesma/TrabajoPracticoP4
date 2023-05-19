import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { CommonComponentsModule } from '../common/components/common-components.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    InicioComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CommonComponentsModule    
  ]
})
export class PagesModule { }
