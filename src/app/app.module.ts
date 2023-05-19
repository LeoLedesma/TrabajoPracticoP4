import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonComponentsModule } from './common/components/common-components.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NgStringPipesModule } from 'angular-pipes';

@NgModule({
  declarations: [
    AppComponent,      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    CommonComponentsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
    NgStringPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
