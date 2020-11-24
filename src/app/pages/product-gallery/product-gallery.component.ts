import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements  OnInit {
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
            //   thumbnailsColumns: 3,
            //   arrowPrevIcon:'fa fa-chevron-left',
            //   arrowNextIcon:'fa fa-chevron-right',
            // previewInfinityMove:true,

          },
          // max-width 400, cannot preview
          {
              breakpoint: 400,
              preview: false
          }
          //   max-width 800
          //   {
          //       breakpoint: 800,
          //       width: '100%',
          //       height: '600px',
          //       imagePercent: 80,
          //       thumbnailsPercent: 20,
          //       thumbnailsMargin: 20,
          //       thumbnailMargin: 20
          //   },
      ];

      this.galleryImages = [
          {
              small: this.productsImage,
              medium: this.productsImage,
              big: this.productsImage
          }
      ];
  }
}
