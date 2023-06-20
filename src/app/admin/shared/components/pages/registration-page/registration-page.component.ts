import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/authService/auth.service";

import {ConfirmedValidator} from "../../../services/customValidators/confirmedValidator";
import {catchError, throwError} from "rxjs";
import {RegistrationInterface} from "../../../services/interfaces/registrationInterface";
import {Router} from "@angular/router";
import {BasketService} from "../../../../../share/services/basketService/basket.service";


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  email: any;
  hide: boolean = true;
  hide2: boolean = true;
  form:FormGroup = new FormGroup({});
  registration:RegistrationInterface = {
    name:'',
    email:'',
    password:'',
    password_confirmation:'',
  };
  submitedForm: boolean = false;
  constructor(
    public http:AuthService,
    private FB: FormBuilder,
    private route:Router,
   private basketService:BasketService
  ) {
    this.form = FB.group({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        password_confirm: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        userName: new FormControl(null, [Validators.maxLength(10), Validators.required]),
    }, {
      validators:[
        ConfirmedValidator('password','password_confirm'),

      ]
      }
    )
  }

  ngOnInit(): void {
    if (localStorage.getItem('b2b_token')){
      this.route.navigate(['account','user','info'])
    }
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
  getErrorMessagePassword2() {
    if (this.form.controls['password_confirm'].hasError('minlength')) {
      return 'minLength 6 letters';
    }

    if (this.form.controls['password'].value !== this.form.controls['password_confirm'].value) {
      return 'You must enter confirm password';
    }

    return ''
  }

  getErrorMessageUserName() {
    if (this.form.controls['userName'].hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  getErrorMessageUserEmail() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.controls['email'].hasError('checkEmailValidator')) {
      return `The "${this.form.controls['email'].value}" has already been taken`;
    }
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    const formData = {...this.form.value}
    this.registration = {
      name:formData.userName,
      email:formData.email,
      password:formData.password,
      password_confirmation:formData.password_confirm,
    }
    this.submitedForm = true
    // console.log(this.registration)
   this.http.registration(this.registration).subscribe(res =>{
     console.log(res)
     this.submitedForm = false
     this.basketService.initializeCartState()
     this.route.navigate(['/'])
   },error => {
     console.log(error)
     this.submitedForm = false
   })
  }


  checkEmail() {
    // console.log(this.form.controls['email'].hasError('required')this.form.controls['email'].hasError('email'))
    if (!this.form.controls['email'].hasError('required') && !this.form.controls['email'].hasError('email')) {
      this.http.checkEmail(this.form.controls['email'].value).pipe(catchError(err => {
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
}
