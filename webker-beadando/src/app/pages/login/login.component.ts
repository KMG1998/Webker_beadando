import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');

  ngOnInit(): void {}

  constructor(private router: Router) {}

  login() {
    if (true) {
      this.router.navigateByUrl('/main');
    } else {
      console.error('Incorrect email or password!');
    }
  }
}
