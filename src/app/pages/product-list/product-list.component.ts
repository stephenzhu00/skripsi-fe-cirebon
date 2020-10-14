import { Component, OnInit } from '@angular/core';
import { Products } from '../../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products;
  constructor() { }

  ngOnInit(): void {
    this.products = Products;
  }
  addToCart(product){
    console.log(product);
  }
}
