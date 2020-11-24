import { Component, Input, OnInit } from '@angular/core';
import { InterfaceProduct } from '../../interfacePorduct';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {
  @Input() clickedProduct:InterfaceProduct;
  listRecommendation:any;
  constructor(private http:HttpClient,private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getRecommendation(this.clickedProduct.productId).subscribe((data)=>{
      this.listRecommendation = data;
      // this.listRecommendation = this.listRecommendation.slice(0,4);
    });
  }

}
