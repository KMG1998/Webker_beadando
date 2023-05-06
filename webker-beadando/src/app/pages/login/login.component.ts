import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');

  ngOnInit(): void {}

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.email.value && this.password.value) {
      this.authService
        .login(this.email.value.toString(), this.password.value.toString())
        .then((cred) => {
          console.log(cred);
          this.router.navigateByUrl('/main');
        });
    } else {
      console.error(this.email.value, this.password.value);
    }
  }
}
