import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { RatingModule } from 'ng-starrating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductRatingComponent } from './pages/product-rating/product-rating.component';
import { RecommendationComponent } from './pages/recommendation/recommendation.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { ProductGalleryComponent } from './pages/product-gallery/product-gallery.component';
import { AdminModule } from './admin/admin.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const firebaseConfig = {
  apiKey: "AIzaSyAdPBfWvCzJ4F2mQfeGqbXzq2IgbaMwpj4",
  authDomain: "skripsi-a402f.firebaseapp.com",
  databaseURL: "https://skripsi-a402f.firebaseio.com",
  projectId: "skripsi-a402f",
  storageBucket: "skripsi-a402f.appspot.com",
  messagingSenderId: "561557745875",
  appId: "1:561557745875:web:c27c91da00b3ecc5772426"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProductListComponent,
    CartComponent,
    ProductDetailComponent,
    TransactionComponent,
    ProductRatingComponent,
    RecommendationComponent,
    ProductGalleryComponent
  ],
  imports: [
    BrowserModule,
    RatingModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    NgbModule,
    NgxGalleryModule,
    AdminModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
