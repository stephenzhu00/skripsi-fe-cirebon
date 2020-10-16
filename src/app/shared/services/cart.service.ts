import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { Transactions } from '../../transactions';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart= [];
  transaction=Transactions;
  constructor(private alertService: AlertService,
              private router:Router) { }
  addToCart(product){
    var index = this.cart.findIndex(item => item.id === product.id);
    let temp = product;
    if (index > -1) {
      this.cart[index].quantity = this.cart[index].quantity + 1;
    } else {
      temp.quantity = 1;
      // product.quantity = 1;
      this.cart.push(temp);
    }
    this.alertService.success(temp.title+" added to cart");
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getProduct(){
    return this.cart;
  }
  deleteProduct(product){
    let index= this.cart.findIndex(e => e.id == product.id);
    if(index !== -1){
      this.cart.splice(index,1);
      localStorage.setItem('cart',JSON.stringify(this.cart));
      this.alertService.warning(product.title+" deleted from cart");
    }
  }

  decrementQty(product){
    var index = this.cart.findIndex(item=> item.id === product.id);
    if(index > -1 && this.cart[index].quantity > 0){
      this.cart[index].quantity = this.cart[index].quantity -1;
      if(this.cart[index].quantity <= 0 ){
        this.deleteProduct(product);
      }
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }
  incrementQty(product){
    var index = this.cart.findIndex(item=> item.id === product.id);
    if(index > -1){
      this.cart[index].quantity = this.cart[index].quantity + 1;
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }
  calculateTotalPrice():number{
    let totalPrice= 0 ;
    for(let i = 0 ; i < this.cart.length ; i++){
      totalPrice+= this.cart[i].price * this.cart[i].quantity;
    }
    return totalPrice;
  }
  
  createInvoice(){
    // TODO CREATE INVOICE
    this.router.navigate(['/transaction']);
  }
}
