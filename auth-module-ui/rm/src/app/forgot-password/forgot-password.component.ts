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
  isReset: boolean = false;


  constructor(
    private service: AuthService,
    private toast: ToastService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.initParam();    
    
    if (this.token) {
      this.isReset = true;
    }    
  }

  initParam() {
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
    this.token = this.cookieService.get('reset_token');
  }

  checkEmail() {
    this.service.forgotPassword(this.email)
      .subscribe(
        response => {
          this.toast.showInfo("", response['message']);
          console.log(response)
        },
        error => {
          this.toast.showError("", error.error.message);
        }
      );
  }

  resetPassword() {
    console.log(this.token)
    this.service.resetPassword(this.password, this.token)
      .subscribe(
        response => {
          this.toast.showInfo("", response['message']);
          console.log(response)
          this.router.navigate(['/login']);
        },
        error => {
          this.initParam();
          console.log(error)
          this.toast.showError("", error.error.message);
        }
      );
      this.cookieService.delete('reset_token');
  }

}
