import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../shared/services/product.service';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  constructor(public productService:ProductService,
              config: NgbRatingConfig,
              private progressBar:ProgressBarService,
              private alertService:AlertService) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
  }
  deleteProduct(product){
    const myObserver = {
      next: x => {
        this.progressBar.setSuccess();
        this.progressBar.completeLoading();
        console.log('Observer got a next value: ' + x);
        this.alertService.success('Delete Success');
        this.productService.refreshListProduct();
      },
      error: err => {
        this.progressBar.setError();
        this.progressBar.completeLoading();
        console.error('Error because ' + err);
        this.alertService.danger('Failed to Delete');
      },
    };
    this.productService.deleteProduct(product.productId).subscribe(myObserver);
  }
}
