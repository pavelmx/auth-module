import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  form: any = {};
  token: string ='';  
  error: string = '';  
 
  constructor(
    private authService: AuthService,    
    private cookieService: CookieService) { }

 
    ngOnInit() {
      this.cookieService.delete('access_token');
    }    
 
  onSubmit() {      
    this.error =''; 
      const loginInfo = new HttpParams()
      .set('username', this.form.username)
      .set('password', this.form.password)
      .set('grant_type', 'password');

      this.authService.login(loginInfo.toString())
      .subscribe( data =>{        
        this.token = JSON.stringify(data['access_token']).substring(1, 37);
        this.cookieService.set( 'access_token', this.token );
        window.location.href = 'http://localhost:4201';
        console.log(this.cookieService.get('access_token'));
      },error =>{ 
        this.error = error.error.error_description;
        console.log(error.error.error_description)
      });
  }
  
  print(){    
    console.log(localStorage.getItem("access_token"))
  }
  
}
