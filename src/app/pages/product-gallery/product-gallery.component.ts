import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements  OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {

      this.galleryOptions = [
          {
              width: '300px',
              height: '300px',
              thumbnailsColumns: 3,
              arrowPrevIcon:'fa fa-chevron-left',
              arrowNextIcon:'fa fa-chevron-right',
              imageDescription:true,
              imageAnimation: NgxGalleryAnimation.Slide,
              previewCloseOnEsc:true,
              previewKeyboardNavigation:true,
              previewInfinityMove:true,
              previewZoom:true,
              previewRotate:true

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
              small: 'assets/img/instagram-1.jpg',
              medium: 'assets/img/instagram-1.jpg',
              big: 'assets/img/instagram-1.jpg'
          },
          {
              small: 'assets/img/instagram-2.jpg',
              medium: 'assets/img/instagram-2.jpg',
              big: 'assets/img/instagram-2.jpg'
          },
          {
              small: 'assets/img/panda.png',
              medium: 'assets/img/panda.png',
              big: 'assets/img/panda.png'
          }
      ];
  }
}
