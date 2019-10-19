import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { AppRoutingModule } from './app.routing';
import { PabellonesComponent } from './components/pabellones/pabellones.component';
import { FirebaseComponent } from './components/firebase/firebase.component';
import { RealtimeComponent } from './components/firebase/realtime/realtime.component';
import { FirestoreComponent } from './components/firebase/firestore/firestore.component';
//modilo para Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment'

import { AngularFireDatabaseModule } from '@angular/fire/database'; //luego pasar a los import

//modulos necesarios para forualarios reactivos
import {FormsModule, ReactiveFormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ErrorComponent,
    PabellonesComponent,
    FirebaseComponent,
    RealtimeComponent,
    FirestoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule                //se importa aqui de arriba
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
