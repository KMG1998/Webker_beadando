import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');
  passwordRep = new FormControl('');
  birthDate = new FormControl('');

  ngOnInit(): void {}

  constructor(private router: Router) {}

  register() {
    if (true) {
      this.router.navigateByUrl('/login');
    } else {
    }
  }
}
