import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,    
    private cookieService: CookieService
  ) { }

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

}
