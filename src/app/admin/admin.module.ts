import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './component/login/login.component';
import { ViewProductsComponent } from './component/view-products/view-products.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { ViewTransactionComponent } from './component/view-transaction/view-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { CreateNewProductComponent } from './component/create-new-product/create-new-product.component';

@NgModule({
  declarations: [LoginComponent, ViewProductsComponent, UpdateProductComponent, ViewTransactionComponent, CreateNewProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule
  ]
})
export class AdminModule { }
