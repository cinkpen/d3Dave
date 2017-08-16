import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LabeledFDGraphComponent } from './labeled-fdgraph/labeled-fdgraph.component';

@NgModule({
  declarations: [
    AppComponent,
    LabeledFDGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
