import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserData } from '../../shared/model/UserData';
import { Timestamp } from '@angular/fire/firestore';
import { UserService } from 'src/app/shared/services/user.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  datePipe = new DateFormatPipe();

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordRep: new FormControl(''),
    birthDate: new FormControl(''),
  });

  ngOnInit(): void {}

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  register() {
    let email = this.signUpForm.get('email')?.value as string;
    let password = this.signUpForm.get('password')?.value as string;
    let passwordRep = this.signUpForm.get('passwordRep')?.value as string;
    let birthDate = this.signUpForm.get('birthDate')?.value as string;
    if (password && passwordRep && password === passwordRep) {
      this.authService
        .signup(email, password)
        .then((cred) => {
          console.log(cred);
          const userData: UserData = {
            birthDate: this.datePipe.transform(birthDate as string),
            lastLogin: Timestamp.now(),
            userId: cred.user?.uid as string,
          };
          this.userService
            .create(userData)
            .then((_) => {
              this.router.navigateByUrl('/login');
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error(password + '' + passwordRep);
    }
  }
}
