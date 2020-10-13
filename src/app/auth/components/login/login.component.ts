import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService:AuthService) { }

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
    const myObserver = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Error because ' + err),
    };
    this.authService.login(this.form.value).subscribe(myObserver);
    console.log(this.form.value);
    console.log(this.form.valid);
  }
}
