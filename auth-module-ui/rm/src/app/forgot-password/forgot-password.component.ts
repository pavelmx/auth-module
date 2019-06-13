import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  password: string;
  confirmPassword: string;
  email: string;
  token: string;
  isReset: boolean;
  load: boolean;
  isSend: boolean;

  constructor(
    private service: AuthService,
    private toast: ToastService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.initParam();    
    this.cookieService.delete('reset_token');
      console.log(this.isReset)
  }

  initParam() {
    this.isSend = false;
    this.load = false;
    this.isReset = false;
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
    this.token = this.cookieService.get('reset_token'); 
    if (this.token) {
      this.isReset = true;
    }  
  }

  checkEmail() {
    this.load = true;
    this.isSend = true;
    this.service.forgotPassword(this.email)
      .subscribe(
        response => {
          this.toast.showInfo("", response['message']);
          console.log(response)
          this.load = false;
        },
        error => {
          this.toast.showError("", error.error.message);
        }
      );
  }

  resetPassword() {
    this.service.resetPassword(this.password, this.token)
      .subscribe(
        response => {
          this.toast.showInfo("", response['message']);
          console.log(response)
          
         
        },
        error => {
          this.initParam();
          console.log(error)
          this.toast.showError("", error.error.message);
        }
      );
      this.router.navigate(['/login']);
  }

  matchPasswords(password, confirmPassword){
    if(password === confirmPassword){
      this.resetPassword();
    }else{
      this.toast.showError("", "Passwords don't match");      
    }
  }  

}
