import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../models/registerForm';
import { Employee } from '../models/employee';
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
  employeeList: Employee[];
  access_token: string;
  toggle: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.access_token = this.cookieService.get("access_token");
    this.authService.checkToken(this.access_token)
    .subscribe(
      response => {      
        console.log(response);
      },
      error => {      
        console.log(error); 
        this.router.navigate(['/login']);
      }
    );    
    this.authService.getActiveEmployees(this.access_token)
    .subscribe(
      response => {
        console.log(response);
        this.employeeList = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form: NgForm) {    
    this.regForm = new RegisterForm(
    this.form.username,
    this.form.password,
    this.form.email
    );
    if(this.toggle == true){
      this.form.employee_id = undefined;
    }
    console.log(this.form.employee_id)
    this.authService.register(this.regForm, this.access_token, this.form.employee_id)
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

  toggleCheckBox(){
    this.toggle = !this.toggle
  }

}
