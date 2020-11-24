import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { ProductService } from '../../../shared/services/product.service';
import { AlertService } from 'ngx-alerts';
import { Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-create-new-product',
  templateUrl: './create-new-product.component.html',
  styleUrls: ['./create-new-product.component.scss']
})
export class CreateNewProductComponent implements OnInit {
  imgSrc:string;
  selectedImage:any = null;

  productDetail;
  form: FormGroup;
  formSubmitted = false;
  constructor(private formBuilder: FormBuilder,
              private progressBar:ProgressBarService,
              private productService:ProductService,
              private alertService: AlertService,
              private location:Location,
              private fireStorage:AngularFireStorage) { }

  ngOnInit(): void {
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.form = this.formBuilder.group({
      productTitle: ['', Validators.required],
      productImg: ['', Validators.required],
      productDesc: ['', Validators.required],
      productPrice: ['', Validators.required],
      productRating: 0,
      productQuantity: ['', Validators.required],
    });
    this.formSubmitted = false;
  }
  // tslint:disable-next-line: typedef
  get f() {return this.form.controls; }

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
    console.log(this.form.value);
    if(this.form.invalid){
      return;
    }
    var filePath = `${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.fireStorage.ref(filePath);
    // console.log("uploading");
    // console.log(this.form.value.productImg);
    // console.log("berhasil");
    this.alertService.info('Uploading Product');
    this.progressBar.startLoading();
    const myObserver = {
      next: x => {
        this.progressBar.setSuccess();
        this.progressBar.completeLoading();
        console.log('Observer got a next value: ' + x);
        this.alertService.success('Upload success');
        this.location.back();        
        this.productService.refreshListProduct();
        // this.router.navigate(['admin/products']);
      },
      error: err => {
        this.progressBar.setError();
        this.progressBar.completeLoading();
        console.error(err);
        this.alertService.danger('Failed to Upload');
      },
    };
    var formValue = this.form.value;
    // this.productService.uploadProduct(this.form.value).subscribe(myObserver);
    this.fireStorage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          // this.form.value.productImg = url;
          formValue.productImg = url;
          this.productService.uploadProduct(formValue).subscribe(myObserver);
        })
      })
    ).subscribe();
    this.form.reset();
    this.imgSrc = '/assets/img/image_placeholder.jpg';
  }
}