import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup = this.fb.group({
    email:[''],
    password:[''],
  })

  ngOnInit(): void {}

  constructor(private router: Router, private authService: AuthService,private fb: FormBuilder) {}

  login() {
    let email = this.loginForm.get('email')?.value as string;
    let password = this.loginForm.get('password')?.value as string;
    if (email && password) {
      this.authService
        .login(email, password)
        .then((cred) => {
          if(cred.user) {
            localStorage.setItem('user', JSON.stringify(cred.user))
            this.router.navigateByUrl('/main')
          }
        });
    } else {
      console.error(email, password);
    }
  }

  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
}
