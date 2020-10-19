import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { Transactions } from '../../transactions';
import { InterfaceProduct } from '../../interfacePorduct';
import { ProductService } from './product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { 
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart:InterfaceProduct[]= [];
  transaction=Transactions;
  urlTransaction = "http://localhost:8085/transaction";

  constructor(private alertService: AlertService,
              private http:HttpClient,
              private productService:ProductService) { }

  getCart(){
    return this.cart;
  }
  addToCart(item:InterfaceProduct){
    const newItem:InterfaceProduct={
      id:item.id,
      title:item.title,
      desc:item.desc,
      img_url:item.img_url,
      price:item.price,
      quantity:1,
      rating:item.rating
    };
    let index:number = this.cart.findIndex(itemCart => itemCart.id === item.id);
    if (index > -1) {
      this.cart[index].quantity = this.cart[index].quantity + 1;
    } else {
      this.cart.push(newItem);
    }
    this.decrQtyListProduct(newItem.id,1);
    this.alertService.success(item.title+" added to cart");
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  deleteProductFromCart(product){
    let index= this.cart.findIndex(e => e.id == product.id);
    if(index !== -1){
      this.incrQtyListProduct(product.id,this.cart[index].quantity);
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
        this.deleteProductFromCart(product);
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
    if(!this.cart || !this.cart.length || this.cart == null || this.cart == undefined) {
      return 0;
    }else {
      let totalPrice= 0 ;
      for(let i = 0 ; i < this.cart.length ; i++){
        totalPrice+= this.cart[i].price * this.cart[i].quantity;
      }
      return totalPrice;
    }
  }
  // UPDATE QTY IN PRODUCT SERVICE
  decrQtyListProduct(productId,qtyToUpdate){
    let index:number = this.productService.listProduct.findIndex(item=>item.id == productId);
    this.productService.listProduct[index].quantity-=qtyToUpdate;
  }
  incrQtyListProduct(productId,qtyToUpdate){
    let index:number = this.productService.listProduct.findIndex(item=>item.id == productId);
    this.productService.listProduct[index].quantity+=qtyToUpdate;
  }
  getAllTransaction(){
    return this.http.get(this.urlTransaction);
  }

  createNewTransaction(){
    // TODO CREATE INVOICE
    let myCart = JSON.parse(localStorage.getItem('cart'));
    localStorage.removeItem('cart');
    localStorage.setItem('cart','[]');
    this.cart = [];
    return this.http.post(this.urlTransaction,myCart,httpOptions).pipe(
      // ADDING ERROR
    );
  }
}
