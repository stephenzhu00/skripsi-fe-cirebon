import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from '../../services/progress-bar.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private progress: NgProgress,public progressBar:ProgressBarService,public authService:AuthService,private alertService:AlertService) { }

  ngOnInit(): void {
    this.progressBar.progressRef = this.progress.ref('progressBar');
  }

  logout(){
    localStorage.removeItem('token');
    this.alertService.success("Logged Out");
  }

}
