import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  currentRate = 3.14;
  product;
  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private cartService:CartService,
              private location:Location) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.product = this.productService.getProduct(parseInt(params.get('id')));
    })
  }
  onBack(){
    this.location.back(); 
  }
  addToCart(product){
    this.cartService.addToCart(product);
  }
}
