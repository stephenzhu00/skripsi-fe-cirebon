import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { AlertService } from 'ngx-alerts';
import { InterfaceProduct } from '../../interfacePorduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productInCart:InterfaceProduct[];
  transactionList= [];
  constructor(public cartService:CartService,
              private router:Router,
              private alertService:AlertService) { }

  ngOnInit(): void {
    this.cartService.cart = JSON.parse(localStorage.getItem('cart'));
  }
  deleteItem(product){
    console.log("delete item");
    this.cartService.deleteProductFromCart(product);
  }
  calculateTotalPrice(){
    return this.cartService.calculateTotalPrice();
  }
  directToTransaction(){
    var model = this.cvtDataToHitTransaction();
    if(model == 0 ){
      // TODO VALIDATE IF CART EMPTY
    }
    console.log(model);
  //  TODO Ngehit backend ??
    this.cartService.createNewTransaction(model).subscribe((data)=>{
      // this.productInCart.push(data);
      this.router.navigate(['/transaction']);
      this.alertService.success("Created Invoice");
    });
  }

  decr(product){
    this.cartService.decrementQty(product);
  }
  incr(product){
    this.cartService.incrementQty(product);
  }
  updateQty(product,qtyInput){
    this.cartService.updateQtyManually(product,qtyInput);
  }
  cvtDataToHitTransaction(){
    const user = JSON.parse(localStorage.getItem('token'));
    const productCust = JSON.parse(localStorage.getItem('cart'));
    console.log(productCust);
    if(productCust.length == 0 ){
      return productCust.length;
    }
    var listId=[];
    var listQty=[];
    var listPrice=[];
    for(var i = 0;i < productCust.length ; i++){
      var temp:any= new Object();
      temp.productId = productCust[i].productId;listId.push(temp);
      temp = new Object();
      temp.qty=productCust[i].productQuantity;listQty.push(temp);
      temp = new Object();
      temp.price=productCust[i].productPrice;listPrice.push(temp);
    }
    var model:any = new Object();
    model.userId = user.id;model.listId = listId;
    model.listQty=listQty;model.listPrice = listPrice;
    return model;
  }
}
