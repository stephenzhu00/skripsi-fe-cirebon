import { Injectable, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart= [];
  constructor(private alertService: AlertService) { }
  addToCart(product){
    var index = this.cart.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.cart[index].quantity = this.cart[index].quantity + 1;
      console.log(this.cart[index].quantity);
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }
    this.alertService.success(product.title+" added to cart");
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
    console.log(this.cart.length);
    for(let i = 0 ; i < this.cart.length ; i++){
      totalPrice+= this.cart[i].price * this.cart[i].quantity;
    }
    return totalPrice;
  }
}
