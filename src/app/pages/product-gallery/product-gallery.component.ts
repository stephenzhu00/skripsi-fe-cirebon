import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements  OnInit , OnChanges{
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @Input() productsImage;

  ngOnInit(): void {

      this.galleryOptions = [
          {
              width: '300px',
              height: '300px',
              thumbnails: false,
              imageArrows: false,
              imageDescription:true,
              imageAnimation: NgxGalleryAnimation.Slide,
              previewDownload: true,
              previewCloseOnEsc:true,
              previewKeyboardNavigation:true,
              previewZoom:true,
              previewRotate:true,
              previewArrows:false,
              previewFullscreen:true,
              previewCloseOnClick:true
          },
          {
              breakpoint: 400,
              preview: false
          }
      ];

      this.galleryImages = [
          {
              small: this.productsImage,
              medium: this.productsImage,
              big: this.productsImage
          }
      ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.galleryImages = [
      {
          small: this.productsImage,
          medium: this.productsImage,
          big: this.productsImage
      }
  ];
  }
}
