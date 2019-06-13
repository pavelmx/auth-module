
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterForm } from '../models/registerForm';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from '../models/employee';


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
private principalUrl = 'http://localhost:8080/user/me';
private userUrl = 'http://localhost:8080/user';
private forgotUrl = 'http://localhost:8080/forgot-password'; 
private resetUrl = 'http://localhost:8080/reset-password'; 
private updatePasswordUrl = 'http://localhost:8080/update-password/'; 
private activeEmployeeUrl = 'http://localhost:8087/employee/active'; 
private updateUrl = 'http://localhost:8080/update'; 

  constructor(
    private http: HttpClient
    ) {
  }
 
  login(credentials){ 
    return this.http.post(this.loginUrl, credentials, {headers});
  }

  register(regForm: RegisterForm, token: string, employee_id: string){
    var role = "ROLE_ADMIN";
    const h = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    if(employee_id == undefined){
      employee_id = '';
    }
    return this.http.post(this.regUrl + "/register?roleNames=" + role + "&access_token=" + token + "&employee_id=" + employee_id, regForm, h);
  } 

  checkToken(token: string){
    const h = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}    
    return this.http.post(this.checkUrl + "?token=" + token, h);
  } 
 
  getEmployeeId(token: string){
    return this.http.get(this.principalUrl + "?access_token=" + token);
  }

  getUser(token: string, username: string){
    return this.http.get(this.userUrl + "?access_token=" + token + "&username=" + username);
  }

  forgotPassword(email: string){
    return this.http.get(this.forgotUrl + "?email=" + email);
  }

  resetPassword(password: string, token: string){
    var o = new Object();
    return this.http.post(this.resetUrl + "?password=" + password + "&token=" + token, o);
  }

  updatePassword(id: number, password: string, token: string){
    return this.http.get(this.updatePasswordUrl + id + "?password=" + password + "&access_token=" + token);
  }

  getActiveEmployees(token: string): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.activeEmployeeUrl + "?access_token=" + token);
  }

  updateEmployeeId(id: number, employee_id: number, token: string){   
    return this.http.get(this.updateUrl + "?userId=" + id + "&employeeId=" + employee_id + "&access_token=" + token);
  }
}  