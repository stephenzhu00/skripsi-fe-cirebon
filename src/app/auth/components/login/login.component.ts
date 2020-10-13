import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService:AuthService,private progressBar:ProgressBarService,private alertService: AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // tslint:disable-next-line: typedef
  get f() {return this.form.controls; }
  // tslint:disable-next-line: typedef
  onSubmit(){
    this.alertService.info('Checking User Info');
    this.progressBar.startLoading();
    const myObserver = {
      next: x => {
        this.progressBar.setSuccess();
        this.progressBar.completeLoading();
        console.log('Observer got a next value: ' + x);
        this.alertService.success('You are logged in');
      },
      error: err => {
        this.progressBar.setError();
        this.progressBar.completeLoading();
        console.error('Error because ' + err);
        this.alertService.danger('Failed to log in');
      },
    };
    this.authService.login(this.form.value).subscribe(myObserver);
    console.log(this.form.value);
    console.log(this.form.valid);
  }
}
