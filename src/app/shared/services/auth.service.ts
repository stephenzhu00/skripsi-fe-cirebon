import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'http://localhost:8085/';
  confirmEmailUrl="test.com";
  constructor(private http:HttpClient) {

  }
  login(model:any){
    return this.http.post(this.authUrl+'login',model).pipe(
      map((response:any)=>{
        const user = response;
        if(user.result == "MANTAP"){
          console.log("Save to local");
          localStorage.setItem('token', user.token);
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
}
