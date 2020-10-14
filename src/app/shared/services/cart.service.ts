import { Injectable, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart= [];
  constructor(private alertService: AlertService) { }
  addToCart(product){
    this.cart.push(product);
    this.alertService.success(product.title+" success insert");
    localStorage.setItem('cart', JSON.stringify(this.cart));
    // localStorage.setItem('cart',this.cart.toString());
  }
  getProduct(){
    return this.cart;
  }
  deleteProduct(product){
    let index= this.cart.findIndex(e => e.id == product.id);
    if(index !== -1){
      this.cart.splice(index,1);
      localStorage.setItem('cart',JSON.stringify(this.cart));
      this.alertService.warning(product.title+" success delete");
    }
  }
}
