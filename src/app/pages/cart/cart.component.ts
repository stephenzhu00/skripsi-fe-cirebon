import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // cart= [];
  constructor(public cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.cart = JSON.parse(localStorage.getItem('cart'));
  }
  deleteItem(product){
    this.cartService.deleteProduct(product);
  }
  calculateTotalPrice(){
    return this.cartService.calculateTotalPrice();
  }
  directToTransaction(){
  //  TODO Ngehit backend ??
    this.cartService.createInvoice();
  }

  decr(product){
    console.log("decr");
    this.cartService.decrementQty(product);
  }
  incr(product){
    this.cartService.incrementQty(product);
  }
}
