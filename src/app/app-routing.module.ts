import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { TransactionComponent } from './pages/transaction/transaction.component';

const routes: Routes = [
  {path: '',redirectTo:'product', pathMatch: 'full',},
  {path: 'product', component: HomeComponent},
  {path: 'product/:id',component:ProductDetailComponent},
  {path: 'transaction',component:TransactionComponent, canActivate:[AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate:[AuthGuard],
    data : { id: 5 }
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
