import { Component, OnInit } from '@angular/core';
import { Products } from '../../products';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.products = Products;
  }
  addToCart(product){
    this.cartService.addToCart(product);
    console.log(product);
  }
}
