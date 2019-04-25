import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  form: any = {};
  token: string ='';

  constructor(
    private authService: AuthService,    
    private router: Router,
    private route: ActivatedRoute) { }


    ngOnInit() {
      window.sessionStorage.clear();     
    }


  onSubmit() {    
      const loginInfo = new HttpParams()
      .set('username', this.form.username)
      .set('password', this.form.password)
      .set('grant_type', 'password');

      this.authService.login(loginInfo.toString())
      .subscribe( data =>{
        this.router.navigate(['/home']);
        this.token = JSON.stringify(data['access_token']).substring(1, 37);
        window.sessionStorage.setItem('access_token', this.token)
        
      },error =>{
        console.log(error.error.error_description)
      });
  }


}
