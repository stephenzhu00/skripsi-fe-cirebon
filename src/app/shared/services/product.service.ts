import { Injectable } from '@angular/core';
import { Products } from '../../products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products;
  constructor() { 
    this.products = Products;
  }
  getAllProduct(){
    return this.products;
  }
  getProduct(productId){
    return this.products.find(x => x.id == productId);
  }
}
