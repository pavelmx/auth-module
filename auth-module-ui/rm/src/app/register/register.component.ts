import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../models/registerForm';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  roles: string[];
  error: string = '';
  regForm: RegisterForm;
  f: NgForm;
  checkToken: any;

  constructor(private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService) { }

  ngOnInit() {
    var token = this.cookieService.get("access_token");
    this.authService.checkToken(token)
    .subscribe(
      response => {      
        console.log(response);
      },
      error => {      
        console.log(error); 
        this.router.navigate(['/login']);
      }
    );    
  }

  onSubmit(form: NgForm) {    
    this.regForm = new RegisterForm(
      this.form.username,
      this.form.password
    );
    var token = this.cookieService.get("access_token");
    this.authService.register(this.regForm, token)
      .subscribe(data => {
        console.log(data);
        form.resetForm();
        //this.router.navigate(['/login']);
        this.toastService.showSuccess("Success", "User success registered");   
      }, error => {       
        this.toastService.showError("Error", error.error.message);   
        console.log(error)
      });
    console.log(this.regForm)
  }

}
