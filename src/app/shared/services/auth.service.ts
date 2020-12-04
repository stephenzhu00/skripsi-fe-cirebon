import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authUrl = 'http://127.0.0.1:5000/';
  authUrl = 'https://skripsi-backend-final.herokuapp.com';
  // TODO VIDEO 42 MAKE BOOTSWATCH ? 
  decodedToken:any;

  constructor(private http:HttpClient) {

  }
  login(model:any){
    return this.http.post(this.authUrl+'/login',model).pipe(
      map((response:any)=>{
        const user = response.users;
        if(user){
          localStorage.setItem('token', JSON.stringify(user));
          this.decodedToken = user;
        }
      })
    );
  }
  register(model:any){
    return this.http.post(this.authUrl+'/register',model, { responseType: 'text' });
  }

  loggedIn(){
    var token = JSON.parse(localStorage.getItem('token'));
    return token;
  }
}
