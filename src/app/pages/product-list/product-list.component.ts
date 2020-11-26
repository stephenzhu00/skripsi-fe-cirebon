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
  queryInput='';
  listProduct;
  categorySelected = 'all';
  ratingSelected = 'ratingall';
  isLoading = true;

  constructor(public cartService:CartService,
              public productService:ProductService,
              config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getAllProductObservable().subscribe((data:InterfaceListProduct)=>{
      this.listProduct = data.product;
      this.isLoading = false;
    });
    this.categorySelected='all';
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  categoryChange(category){
    this.categorySelected = category.target.id;
    this.filterProduct();
  }

  ratingChange(rating){
    this.ratingSelected = rating.target.id;
    this.filterProduct();
  }

  filterProduct(){
    const ratingConst = this.ratingSelected;
    const categoryConst = this.categorySelected;
    this.listProduct = this.productService.listProduct.filter(function(item){
      if(ratingConst != 'ratingall' && categoryConst != 'all'){
        return item.productCategory == categoryConst && item.productRating >= parseInt(ratingConst);
      }else if(ratingConst != 'ratingall'){
        return item.productRating >= parseInt(ratingConst);
      }else if(categoryConst != 'all'){
        return item.productCategory == categoryConst;
      }else {
        return true;
      }
    });
  }

  searchProduct(queryInput){
    this.queryInput =queryInput;
    this.listProduct = this.productService.listProduct.filter(function(item){
      return item.productTitle.toLowerCase().includes(queryInput.toLowerCase());
    });
  }
}
