import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent implements OnInit {
  @Input() transaction;
  @Input() product;
  submitted: boolean;
  rating;
  constructor(private alerService:AlertService) { 
  }

  ngOnInit(): void {
    this.rating = (this.product.userRating != undefined)?this.product.rating : 0;
    this.submitted = (this.rating == 0)?false:true;
  }
  saveRating(){
    if(this.rating == 0 ){
      this.alerService.warning("Rating between 1 - 5");
      return;
    }
    // TODO SAVE TO BACKEND
    this.alerService.success("Rating saved");
    this.submitted = true;
  }

}
