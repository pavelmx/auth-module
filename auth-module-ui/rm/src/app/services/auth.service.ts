
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterForm } from '../models/registerForm';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


const headers = {
    'Authorization': 'Basic ' + btoa('clientid:clientsecret'),
    'Content-type': 'application/x-www-form-urlencoded'
  }
  

@Injectable({
    providedIn: 'root'
})
export class AuthService {

private loginUrl = 'http://localhost:8080/oauth/token';
private regUrl = 'http://localhost:8080';
private checkUrl = 'http://localhost:8080/oauth/check_token';
private userUrl = 'http://localhost:8080/user/me';
 
  constructor(
    private http: HttpClient,
    private cookieService: CookieService) {
  }
 
  login(credentials){ 
    return this.http.post(this.loginUrl, credentials, {headers});
  }

  register(regForm: RegisterForm, token: string){
    var role = "ROLE_ADMIN";
    const h = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    return this.http.post(this.regUrl + "/register?roleNames=" + role + "&access_token=" + token, regForm, h);
  } 

  checkToken(token: string){
    const h = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}    
    return this.http.post(this.checkUrl + "?token=" + token, h);
  } 
 
  getEmployeeId(token: string){
    return this.http.get(this.userUrl + "?access_token=" + token);
  }
}  