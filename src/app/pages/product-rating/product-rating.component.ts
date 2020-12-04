import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent implements OnInit,OnChanges {
  @Input() transaction;
  @Input() product;
  submitted: boolean;
  rating;
  constructor(private alerService:AlertService,
              private cartService:CartService) { 
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
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
    const user = JSON.parse(localStorage.getItem('token'));

    var obj:any = new Object();
    // obj.user_id = user.id;
    obj.user_id = 200;
    obj.product_id = this.product.productDetail.productId;
    obj.rating = this.rating;
    this.cartService.updateRating(obj).subscribe();
    this.alerService.success("Rating saved");
    this.submitted = true;
  }

}
