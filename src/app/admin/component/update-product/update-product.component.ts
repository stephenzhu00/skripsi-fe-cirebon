import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { ProductService } from '../../../shared/services/product.service';
import { InterfaceListProduct } from '../../../interfacePorduct';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productDetail;
  productId;
  form: FormGroup;
  formSubmitted = false;
  constructor(private formBuilder: FormBuilder,
              private progressBar:ProgressBarService,
              private productService:ProductService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router:Router,
              private location:Location) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productTitle: ['', Validators.required],
      productImg: ['', Validators.required],
      productDesc: ['', Validators.required],
      productPrice: ['', Validators.required],
      productRating: ['', Validators.required],
      productQuantity: ['', Validators.required],
    });
    this.formSubmitted = false;
    this.route.paramMap.subscribe(params=>{
      this.productId = parseInt(params.get('id'));
      this.productService.getProduct(parseInt(params.get('id'))).subscribe((data:InterfaceListProduct)=>{
        this.productDetail =data.product;
        this.form.patchValue(this.productDetail);
      });
    });
  }
  // tslint:disable-next-line: typedef
  get f() {return this.form.controls; }
  imgSrc;
  selectedImage;
  showPreview(event:any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }
  // tslint:disable-next-line: typedef
  onSubmit(){
    this.formSubmitted = true;
    if(this.form.invalid){
      return;
    }
    this.alertService.info('Updating Product');
    this.progressBar.startLoading();
    const myObserver = {
      next: x => {
        this.progressBar.setSuccess();
        this.progressBar.completeLoading();
        console.log('Observer got a next value: ' + x);
        this.alertService.success('Update success');
        this.location.back();        
        this.productService.refreshListProduct();
        // this.router.navigate(['admin/products']);
      },
      error: err => {
        this.progressBar.setError();
        this.progressBar.completeLoading();
        console.error('Error because ' + err);
        this.alertService.danger('Failed to update');
      },
    };
    this.productService.updateProduct(this.productId,this.form.value).subscribe(myObserver);
  }
}
