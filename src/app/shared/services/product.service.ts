import { Injectable } from '@angular/core';
// import { Products } from '../../products';
import { InterfaceProduct, InterfaceListProduct } from '../../interfacePorduct';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listProduct:InterfaceProduct[];
  // listProduct:any;
  productDetail;
  // private urlProduct ="http://localhost:8085/product";
  private urlProduct='https://skripsi-backend-final.herokuapp.com/products/rating/3';
  constructor(private http:HttpClient) { 
    this.getAllProduct();
  }

  getAllProduct(){
    return this.http.get(this.urlProduct).subscribe((data:InterfaceListProduct)=>{
      console.log("masuk");
      console.log(data);
      this.listProduct = data.product;
    });
  }

  getAllProductObservable(){
    return this.http.get(this.urlProduct);
  }

  filterProduct(category , rating ){  
    const c = category;
    const r = rating ;
  }

  refreshListProduct(){
    this.http.get(this.urlProduct).toPromise().then((res:InterfaceListProduct)=>this.listProduct= res.product as InterfaceProduct[]);
  }
  getProductWithoutBackEnd(productId){
    let index:number = this.listProduct.findIndex(e=>e.productId == productId)
    return this.productDetail = this.listProduct[index];
  }
  getProduct(productId){
    return this.http.get(this.urlProduct+"/"+productId);
  }
  
  getRecommendation(clickedProduct){
    return this.http.get(this.urlProduct+"/"+clickedProduct+"/recommendation");
  }

  uploadProduct(product){
    return this.http.post(this.urlProduct,product);
  }
  deleteProduct(productId){
    return this.http.delete(this.urlProduct+"/"+productId);
  }
  updateProduct(productId,dataUpdated){
    return this.http.put(this.urlProduct+"/"+productId,dataUpdated);
  }
}
