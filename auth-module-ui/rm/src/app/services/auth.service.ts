
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterForm } from '../models/registerForm';
import { Observable } from 'rxjs';


const headers = {
    'Authorization': 'Basic ' + btoa('clientid:clientsecret'),
    'Content-type': 'application/x-www-form-urlencoded'
  }
  

@Injectable({
    providedIn: 'root'
})
export class AuthService {

private loginUrl = 'http://localhost:8080/oauth/token';
private regUrl = 'http://localhost:8080/client';
private resUrl = 'http://localhost:8081/simple';
 
  constructor(private http: HttpClient) {
  }
 
  login(credentials){
    return this.http.post(this.loginUrl, credentials, {headers});
  }

  register(regForm: RegisterForm){
    const h ={headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    return this.http.post(this.regUrl + "/register?roleNames=ROLE_ADMIN", regForm, h);
  } 
 
  getList(token: string): Observable<string[]>{  
    return this.http.get<string[]>(this.resUrl + "/cars?access_token=" + token);
  }
}