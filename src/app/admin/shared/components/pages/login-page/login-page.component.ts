import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginInterface, RegistrationInterface} from "../../../services/interfaces/registrationInterface";
import {AuthService} from "../../../services/authService/auth.service";
import {Router} from "@angular/router";
import {catchError, Subscription, throwError} from "rxjs";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import {BasketService} from "../../../../../share/services/basketService/basket.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit ,OnDestroy{
  email: any;
  hide: boolean = true;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    // userName: new FormControl(null, [Validators.maxLength(10), Validators.required])
  })
  login:LoginInterface = {
    email:'',
    password:'',
    provider:''
  };

  user: SocialUser | undefined;

  loggedIn: boolean;

  sub:Subscription
  constructor(
    private auth:AuthService,
    private route:Router,

    private authService: SocialAuthService,
    private basketService:BasketService

  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('b2b_token')){
      this.route.navigate(['account','user','info'])
    }
    this.sub = this.authService.authState.subscribe((user) => {
      this.user = user;

      this.loggedIn = (user != null);
      if (this.loggedIn){

        this.signIn(this.user)
      }
    });
  }

  getErrorMessagePassword() {
    if (this.form.controls['password'].hasError('minlength')) {
      return 'minLength 6 letters';
    }

    if (this.form.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  // getErrorMessageUserName() {
  //   if (this.form.controls['userName'].hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //   return ''
  // }

  getErrorMessageUserEmail() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.controls['email'].hasError('checkEmailValidator')) {
      return `The "${this.form.controls['email'].value}" does not exist in the database`;
    }
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  checkExistEmail() {
    // console.log(this.form.controls['email'].hasError('required')this.form.controls['email'].hasError('email'))
    if (!this.form.controls['email'].hasError('required') && !this.form.controls['email'].hasError('email')) {
      this.auth.existEmail(this.form.controls['email'].value).pipe(catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })).subscribe(res =>{
        this.form.controls['email'].setErrors(null)
      },error => {
        this.form.controls['email'].setErrors({checkEmailValidator:true})
        // console.clear()
      })
    }
  }
  submit() {
    const formData = {...this.form.value}
    this.login = {
      email:formData.email,
      password:formData.password,
      provider:'DESKTOP'
    }
    this.auth.login(this.login).subscribe(res =>{
      this.basketService.initializeCartState()
      this.route.navigate(['/'])
    })
  }
  signIn(userGoogle:SocialUser){

    const authGoogle:RegistrationInterface={
        name: userGoogle.name,
        email:userGoogle.email,
        password: userGoogle.id,
        password_confirmation:userGoogle.id,
        provider:userGoogle.provider
      }

      this.auth.loginGoogle(authGoogle).subscribe(res =>{
        this.basketService.initializeCartState()
        this.route.navigate(['/'])

      },error => {
        console.log(error,'!!!!!!!!!__!!')
      })

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
