import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cirebon';

  constructor(private authService:AuthService){

  }
  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('token'));
    this.authService.decodedToken = token;
  }
}
