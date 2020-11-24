import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ViewProductsComponent } from './component/view-products/view-products.component';
import { ViewTransactionComponent } from './component/view-transaction/view-transaction.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { CreateNewProductComponent } from './component/create-new-product/create-new-product.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ViewProductsComponent},
  {path: 'products/:id',component:UpdateProductComponent},
  {path: 'transaction', component: ViewTransactionComponent},
  {path: 'create',component:CreateNewProductComponent},
  {path: '**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
