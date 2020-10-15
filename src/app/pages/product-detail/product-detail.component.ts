import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private productService:ProductService) { }
  product;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.product = this.productService.getProduct(parseInt(params.get('id')));
    })
  }

}
