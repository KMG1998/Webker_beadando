import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/auth.service';
import {UserData} from '../../shared/model/UserData';
import {Timestamp} from '@angular/fire/firestore';
import {UserService} from 'src/app/shared/services/user.service';
import {DateFormatPipe} from 'src/app/shared/pipes/date-format.pipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  datePipe = new DateFormatPipe();

  signUpForm = new FormGroup({
    email: new FormControl('',{ validators: [Validators.required,Validators.email], updateOn: "blur" }),
    password: new FormControl('',{ validators: [Validators.required,Validators.minLength(6)], updateOn: "change" }),
    passwordRep: new FormControl('',{ validators: [Validators.required,Validators.minLength(6)], updateOn: "blur" }),
    birthDate: new FormControl('',{ validators: [Validators.required], updateOn: "blur" }),
  });

  ngOnInit(): void {
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  register() {
    let email = this.signUpForm.get('email')?.value as string;
    let password = this.signUpForm.get('password')?.value as string;
    let birthDate = this.signUpForm.get('birthDate')?.value as string;
    if (this.signUpForm.valid && this.passwordsMatch) {
      this.authService
        .signup(email, password)
        .then((cred) => {
          console.log(cred);
          const userData: UserData = {
            birthDate: this.datePipe.transform(birthDate as string),
            lastLogin: Timestamp.now(),
            userId: cred.user?.uid as string,
          };
          this.authService.logout().then(() => this.userService
            .create(userData)
            .then((_) => {
              this.router.navigateByUrl('/login');
            })
            .catch((error) => {
              console.error(error);
            })).catch((error) => console.log(error))
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  get email(){
    return this.signUpForm.get('email')
  }
  get password(){
    return this.signUpForm.get('password')
  }
  get passwordRep(){
    return this.signUpForm.get('passwordRep')
  }
  get birthDate(){
    return this.signUpForm.get('birthDate')
  }
  get passwordsMatch(){
    return this.password?.value === this.passwordRep?.value
  }
}
