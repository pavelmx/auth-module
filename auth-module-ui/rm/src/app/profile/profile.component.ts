import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../services/toast.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: any = {};
  password: string;
  accessToken: string;
  employeeList: Employee[];

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.initUser()
  }

  compareFn(x: any, y:any): boolean{     
    console.log(x)
    console.log(y)
    return x && y ? x.id === y.id: x === y;
  }

  initUser(){
    this.accessToken = this.cookieService.get('access_token');
    var username= this.cookieService.get('username');
    this.authService.getUser(this.accessToken, username)
    .subscribe(
      response => {
        console.log(response)
        this.form.id = response['id'];
        this.form.username = response['username'];
        this.form.email = response['email'];
        this.form.employee_id = response['employeeId'];
        this.form.enabled = response['enabled'];
        this.form.created = response['created'];
        this.form.updated = response['updated'];
        console.log(this.form)
      },
      error => {
        console.log(error)
      }
    );
    this.authService.getActiveEmployees(this.accessToken)
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

  updatePassword(){
    this.authService.updatePassword(this.form.id, this.password, this.accessToken)
    .subscribe(
      response => {
        this.toastService.showSuccess("", "Password changed successfully");
        this.password = '';
        this.initUser();
      },
      error => {
        console.log(error)
      }
    );
  }

}
