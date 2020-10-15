import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(private cartService:CartService,
              public productService:ProductService) { }

  ngOnInit(): void {
  }
  addToCart(product){
    this.cartService.addToCart(product);
  }
}
