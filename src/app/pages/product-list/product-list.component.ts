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
  categorySelected = 'all';
  ratingSelected = 'all';

  constructor(public cartService:CartService,
              public productService:ProductService,
              config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit(): void {
    this.categorySelected='all';
    console.log("mulai");
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  categoryChange(category){
    this.categorySelected = category.target.id;
    this.productService.filterProduct(this.categorySelected,this.ratingSelected);
  }

  ratingChange(rating){
    this.ratingSelected = rating.target.id;
    this.productService.filterProduct(this.categorySelected,this.ratingSelected);
  }
  searchProduct(queryInput){
    console.log(queryInput);
    var test = this.productService.listProduct.filter(function(item){
      // console.log(item.productTitle);
      // console.log(item.productTitle.includes(queryInput));
      return item.productTitle.toLowerCase().includes(queryInput.toLowerCase());
    });
    console.log(test);
  }
}
