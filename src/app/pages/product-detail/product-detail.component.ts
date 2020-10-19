import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { InterfaceProduct } from '../../interfacePorduct';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  currentRate = 3.14;
  productDetail;
  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private cartService:CartService,
              private location:Location) { }
  ngOnInit(): void {
    // TODO DISCUSS WITH BACKEND OR NOT
    this.route.paramMap.subscribe(params=>{
      this.productDetail = this.productService.getProductWithoutBackEnd(parseInt(params.get('id')));
      // this.productService.getProduct(parseInt(params.get('id'))).subscribe((data:InterfaceProduct)=>{
      //   this.productDetail =data;
      // });
    });
  }
  onBack(){
    this.location.back(); 
  }
  addToCart(product){
    this.cartService.addToCart(product);
  }
}
