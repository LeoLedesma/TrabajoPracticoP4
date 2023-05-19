import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../guards/auth.guard';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { ContactameComponent } from './contactame/contactame.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: InicioComponent },            
      {path: 'about-me', component:SobreMiComponent},
      {path: 'contactame', component:ContactameComponent},
      { path: '**', redirectTo: 'error' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
