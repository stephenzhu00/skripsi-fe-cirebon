import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
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
  cart:any= [];
  transaction;
  // urlTransaction = "http://localhost:8085/transaction";
  urlTransaction = "http://127.0.0.1:5000/transactions-history";

  constructor(private alertService: AlertService,
              private http:HttpClient,
              private productService:ProductService) { }

  getCart(){
    return this.cart;
  }
  addToCart(item:InterfaceProduct){
    const newItem:InterfaceProduct={
      productCategory: item.productCategory,
      productId: item.productId,
      productTitle:item.productTitle,
      productDesc:item.productDesc,
      productImg:item.productImg,
      productPrice:item.productPrice,
      productQuantity:1,
      productRating:item.productRating
    };
    let index:number = this.cart.findIndex(itemCart => itemCart.productId === item.productId);
    if (index > -1) {
      this.cart[index].productQuantity = this.cart[index].productQuantity + 1;
    } else {
      this.cart.push(newItem);
    }
    this.decrQtyListProduct(newItem.productId,1);
    this.alertService.success(item.productTitle+" added to cart");
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  deleteProductFromCart(product){
    let index= this.cart.findIndex(e => e.productId == product.productId);
    if(index !== -1){
      this.incrQtyListProduct(product.productId,this.cart[index].productQuantity);
      this.cart.splice(index,1);
      localStorage.setItem('cart',JSON.stringify(this.cart));
      this.alertService.warning(product.productTitle+" deleted from cart");
    }
  }

  decrementQty(product){
    var index = this.cart.findIndex(item=> item.productId === product.productId);
    if(index > -1 && this.cart[index].productQuantity > 0){
      this.cart[index].productQuantity = this.cart[index].productQuantity -1;
      if(this.cart[index].productQuantity <= 0 ){
        this.deleteProductFromCart(product);
      }
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }
  incrementQty(product){
    var index = this.cart.findIndex(item=> item.productId === product.productId);
    if(index > -1){
      this.cart[index].productQuantity = this.cart[index].productQuantity + 1;
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }
  calculateTotalPrice():number{
    if(!this.cart || !this.cart.length || this.cart == null || this.cart == undefined) {
      return 0;
    }else {
      let totalPrice= 0 ;
      for(let i = 0 ; i < this.cart.length ; i++){
        totalPrice+= this.cart[i].productPrice * this.cart[i].productQuantity;
      }
      return totalPrice;
    }
  }
  // UPDATE QTY IN PRODUCT SERVICE
  decrQtyListProduct(productId,qtyToUpdate){
    let index:number = this.productService.listProduct.findIndex(item=>item.productId == productId);
    this.productService.listProduct[index].productQuantity-=qtyToUpdate;
  }
  incrQtyListProduct(productId,qtyToUpdate){
    let index:number = this.productService.listProduct.findIndex(item=>item.productId == productId);
    this.productService.listProduct[index].productQuantity+=qtyToUpdate;
  }
  // Transaction Service
  getAllTransaction(){
    return this.http.get(this.urlTransaction);
  }

  getAllTransactionById(){
    const user = JSON.parse(localStorage.getItem('token'));

    var temp = '{ "userId" :'+user.id+'}';
    const userId = JSON.parse(temp);
    // console.log(userId);
    return this.http.post(this.urlTransaction,userId);
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
