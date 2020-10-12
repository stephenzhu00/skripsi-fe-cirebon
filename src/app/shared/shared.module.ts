import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavbarComponent, ColumnOneComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ColumnOneComponent
  ]
})
export class SharedModule { }
