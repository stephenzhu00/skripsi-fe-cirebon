import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  totalstar = 5;
  product;
  constructor(private route:ActivatedRoute,
              private productService:ProductService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.product = this.productService.getProduct(parseInt(params.get('id')));
      this.product.ratingInt = parseInt(this.product.rating);
    })
  }
}
