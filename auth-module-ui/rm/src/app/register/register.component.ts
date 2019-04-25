import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../models/registerForm';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    /*const regForm = new RegisterForm(
      this.form.first_name,
      this.form.last_name,      
      this.form.email,
      this.form.tel,
      this.form.skype    
      this.roles
    );
*/
    this.regForm = new RegisterForm(
      this.form.username,
      this.form.password
    );

    this.authService.register(this.regForm)
      .subscribe(data => {
        console.log(data);
        form.resetForm();
        this.router.navigate['/login'];
      }, error => {
        this.error = error.error.error;
        console.log(error)
      });
    console.log(this.regForm)
  }

}
