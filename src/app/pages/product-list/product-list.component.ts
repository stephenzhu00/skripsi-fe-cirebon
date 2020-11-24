import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { InterfaceListProduct, InterfaceProduct } from '../../interfacePorduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  listProduct;
  categorySelected = 'all';
  ratingSelected = 'all';

  constructor(public cartService:CartService,
              public productService:ProductService,
              config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit(): void {
    this.productService.getAllProductObservable().subscribe((data:InterfaceListProduct)=>{
      this.listProduct = data.product;
    });
    this.categorySelected='all';
    console.log("mulai");
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  categoryChange(category){
    this.categorySelected = category.target.id;
  }

  ratingChange(rating){
    this.ratingSelected = rating.target.id;
  }
  searchProduct(queryInput){
    console.log(queryInput);
    this.listProduct = this.productService.listProduct.filter(function(item){
      return item.productTitle.toLowerCase().includes(queryInput.toLowerCase());
    });
    console.log(this.listProduct);
  }
}
