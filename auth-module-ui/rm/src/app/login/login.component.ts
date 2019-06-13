import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../services/toast.service';
import { Router, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  token: string = '';
  resultLink: string;
  domenLink: string;
  routLink: string;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastService: ToastService,
  ) { }


  getRedirectLink() {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    if (snapshot.url.includes("=")) {
      this.resultLink = snapshot.url.split("=")[1];
      while (this.resultLink.includes("%2F")) {
        this.resultLink = this.resultLink.replace("%2F", "/")
      }
      console.log(this.resultLink);
      this.domenLink = this.resultLink.split("/")[2];
      console.log(this.domenLink);
      this.routLink = this.resultLink.substring(22);
      console.log(this.routLink);
    }
    if (snapshot.url.includes("#")) {
      var routParam = snapshot.url.split("#")[1];
      var routLink = routParam.split("?")[0];    
      var paramToken = routParam.split("?")[1];
      var token = paramToken.split("=")[1];
      this.cookieService.set('reset_token', token);
      console.log(routLink);
      this.router.navigate(["/" + routLink]);
    }
  }

  redirectToLink() {
    if (this.resultLink == undefined) {
      //window.location.href = "";  
      this.router.navigate(['/home']);
      console.log("redirect to something...");
    } else {

      var url = "http://" + this.domenLink + "#" + this.routLink;
      console.log(url)
      //window.location.href = url;
    }
  }

  ngOnInit() {
    this.getRedirectLink();
    this.cookieService.delete("access_token");   
    this.cookieService.delete("employeeId");
    this.cookieService.delete("username"); 
  }

  onSubmit() {
    const loginInfo = new HttpParams()
      .set('username', this.form.username)
      .set('password', this.form.password)
      .set('grant_type', 'password');
    this.authService.login(loginInfo.toString())
      .subscribe(data => {
        this.token = JSON.stringify(data['access_token']).substring(1, 37);
        this.cookieService.set('access_token', this.token, 1);
        this.redirectToLink();
        this.getEmployeeId();
      }, error => {
        this.toastService.showError("Error", error.error.error_description);
        console.log(error.error.error_description)
      });
  }

  getEmployeeId(){
    var token = this.cookieService.get("access_token");
    this.authService.getEmployeeId(token)
      .subscribe(
        response => {
          var employeeId = response['principal'].employeeId;        
          this.cookieService.set('employeeId', employeeId);
          var username = response['principal'].username; 
          this.cookieService.set('username', username);
          console.log(employeeId)
        },
        error => {
          console.log(error)
        }
      );
  }
}
