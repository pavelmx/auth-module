import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listData: string[]=[];
  logged: boolean;
  token: string ='';

  constructor( private authService: AuthService) { }

  ngOnInit() {
    if(window.sessionStorage.getItem('access_token')!=null){
      this.logged = true;
      this.token = window.sessionStorage.getItem('access_token');
      this.getList();
    }else{
      this.logged = false;
    }    
  }

  getList(){
    this.authService.getList(this.token)
    .subscribe(data =>{
      this.listData = data;
    },
    error => {
      console.log(error)
    }
    );
  }

  logout(){
    window.sessionStorage.clear();     
  }
}
