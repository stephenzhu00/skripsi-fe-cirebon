import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  constructor(private formBuilder: FormBuilder, 
              private authService:AuthService,
              private progressBar:ProgressBarService,
              private alertService: AlertService,
              private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formSubmitted = false;
  }
  // tslint:disable-next-line: typedef
  get f() {return this.form.controls; }
  // tslint:disable-next-line: typedef
  onSubmit(){
    this.formSubmitted = true;
    if(this.form.invalid){
      return;
    }
    this.alertService.info('Checking User Info');
    this.progressBar.startLoading();
    const myObserver = {
      next: x => {
        this.progressBar.setSuccess();
        this.progressBar.completeLoading();
        console.log('Observer got a next value: ' + x);
        this.alertService.success('You are logged in');
        this.router.navigate(['']);
      },
      error: err => {
        this.progressBar.setError();
        this.progressBar.completeLoading();
        console.error('Error because ' + err);
        this.alertService.danger('Failed to log in');
      },
    };
    this.authService.login(this.form.value).subscribe(myObserver);
  }
}
