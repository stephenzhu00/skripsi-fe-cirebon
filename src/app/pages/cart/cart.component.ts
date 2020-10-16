import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productInCart = [];
  transactionList= [];
  constructor(public cartService:CartService,
              private router:Router,
              private alertService:AlertService) { }

  ngOnInit(): void {
    this.cartService.cart = JSON.parse(localStorage.getItem('cart'));
  }
  deleteItem(product){
    this.cartService.deleteProductFromCart(product);
  }
  calculateTotalPrice(){
    return this.cartService.calculateTotalPrice();
  }
  directToTransaction(){
  //  TODO Ngehit backend ??
    this.cartService.createNewTransaction().subscribe((data)=>{
      this.productInCart.push(data);
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
}
