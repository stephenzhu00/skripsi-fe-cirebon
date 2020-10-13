import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { RouterModule } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';

@NgModule({
  declarations: [NavbarComponent, ColumnOneComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgProgressModule,
    BrowserAnimationsModule,
    BrowserModule,
 
    // Specify your library as an import (set timeout to -1 for unlimited timeout, the message can only be closed by the user clicking on it)
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top'})
  ],
  exports:[
    ColumnOneComponent
  ]
})
export class SharedModule { }
