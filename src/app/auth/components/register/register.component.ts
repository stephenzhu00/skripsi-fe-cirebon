import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  formSubmitted;
  constructor(private formBuilder: FormBuilder,
              private authService:AuthService,
              private progressBar:ProgressBarService, 
              private alertService:AlertService,
              private router:Router) { }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // tslint:disable-next-line: typedef
  get f() { return this.form.controls; }
 
  // tslint:disable-next-line: typedef
  onSubmit(){
    this.formSubmitted = true;
    if(this.form.invalid){
      return;
    }
    this.alertService.info('Going to register');
    this.progressBar.startLoading();
    const myObserver = {
      next: x => {
        this.progressBar.setSuccess();
        this.progressBar.completeLoading()
        console.log('Observer got a next value: ' + x);
        this.alertService.success("Register Success");
        this.router.navigate(['auth/login']);
      },
      error: err => {
        this.progressBar.setError();
        this.progressBar.completeLoading();
        console.error('Error because ' + err);
        this.alertService.danger('Fail Register');
      },
    };
    this.authService.register(this.form.value).subscribe(myObserver);
  }

}
