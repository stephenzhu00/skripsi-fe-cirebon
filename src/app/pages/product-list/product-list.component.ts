import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { InterfaceProduct } from '../../interfacePorduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(public cartService:CartService,
              public productService:ProductService,
              config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  }
  addToCart(product){
    this.cartService.addToCart(product);
  }
}
