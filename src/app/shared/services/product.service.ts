import { Injectable } from '@angular/core';
// import { Products } from '../../products';
import { InterfaceProduct } from '../../interfacePorduct';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listProduct:InterfaceProduct[];
  private urlProduct ="http://localhost:8085/product";

  constructor(private http:HttpClient) { 
    this.getAllProduct();
  }

  getAllProduct(){
    return this.http.get(this.urlProduct).subscribe((data:InterfaceProduct[])=>{
      this.listProduct = data;
    });
  }
  getProduct(productId){
    return this.http.get(this.urlProduct+"/"+productId);
  }
  
}
