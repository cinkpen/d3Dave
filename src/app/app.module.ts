import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LabeledFDGraphComponent } from './labeled-fdgraph/labeled-fdgraph.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAnOnNssyXjbgboaTYkcpQ9Lns3ECXZ-RI",
  authDomain: "d3backend.firebaseapp.com",
  databaseURL: "https://d3backend.firebaseio.com",
  projectId: "d3backend",
  storageBucket: "",
  messagingSenderId: "518737878614"
};

@NgModule({
  declarations: [
    AppComponent,
    LabeledFDGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
