import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'http://localhost:8085/';
  confirmEmailUrl="test.com";
  helper = new JwtHelperService();
  // TODO DELETE TOKEN
  // TODO VIDEO 42 MAKE BOOTSWATCH ? 
  decodedToken:any;

  constructor(private http:HttpClient) {

  }
  login(model:any){
    return this.http.post(this.authUrl+'login',model).pipe(
      map((response:any)=>{
        const user = response;
        if(user.result == "MANTAP"){
          console.log("Save to local");
          localStorage.setItem('token', user.token);
          this.decodedToken = this.helper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }
  register(model:any){
    // COMMENT FOR PASSING HEADER TO BACK END
    // let headers = new HttpHeaders({
    //   'confirmEmailUrl':this.confirmEmailUrl
    // });
    // let options = {headers:headers};
    return this.http.post(this.authUrl+'register',model);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }
}
