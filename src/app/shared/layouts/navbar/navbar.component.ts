import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from '../../services/progress-bar.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private progress: NgProgress,
              public progressBar:ProgressBarService,
              public authService:AuthService,
              private alertService:AlertService,
              private router:Router,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.progressBar.progressRef = this.progress.ref('progressBar');
  }

  isAdmin(){
    // TODO tentuin user id seorang admin
    return this.authService.loggedIn() && this.authService.decodedToken.id == 5;
  }

  logout(){
    this.cartService.cart = [];
    localStorage.removeItem('token');
    localStorage.setItem('cart',JSON.stringify(this.cartService.cart));
    this.router.navigate(['/auth/login']);
    this.alertService.success("Logged Out");
  }

}
