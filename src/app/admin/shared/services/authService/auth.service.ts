import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, switchMap, tap} from "rxjs";
import {
  answerLoginUser,
  answerRegisterUser,
  RegistrationInterface
} from "../interfaces/registrationInterface";
import {environment} from "../../../../../environments/environment";

import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private auth: boolean = false;
  private googleUser:any = {};
  checkAuth = new BehaviorSubject(this.auth)
 public  checkGoogleUser = new BehaviorSubject(this.googleUser)
  constructor(
    private http: HttpClient,
    private route:Router,
    ) {
    // let test = this.token;
    // console.log(test, 'this token')
  }

  get token(): string {
    const expToken = new Date(JSON.parse(JSON.stringify(localStorage.getItem('b2b_token-exp')))).getTime()
    const now = new Date().getTime();
    if (now > expToken) {
      this.logoutClearStorage()
      return ''
    } else {
      // console.log('next')
      this.checkAuth.next(true)
      return JSON.parse(JSON.stringify(localStorage.getItem('b2b_token')))
    }


  }
  public setGoogleUser(user:any){
    this.checkGoogleUser.next(user)
  }

  registration(data: RegistrationInterface): Observable<any | answerRegisterUser> {
    return this.http.post<answerRegisterUser>(`${environment.url}register`, {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }).pipe(tap(this.setToken))
  }

  login(data: any): Observable<any | answerLoginUser> {
    console.log('login')
    return this.http.post<answerLoginUser>(`${environment.url}login`, {
      email: data.email,
      password: data.password,
      provider: data.provider
    }).pipe(tap(this.setToken))
  }

  loginGoogle(data: RegistrationInterface): Observable<any | answerRegisterUser> {
    console.log('loginGoogle')
    return this.http.post<answerRegisterUser>(`${environment.url}login`, {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      provider: data.provider

    }).pipe(tap(this.setToken))

  }

  test(): Observable<any> {
    return this.http.get<any>(`${environment.url}test`, {})
  }

  checkEmail(email: any): Observable<any> {
    return this.http.get<any>(`${environment.url}checkEmail?email=${email}`)
  }

  existEmail(email: any): Observable<any> {
    return this.http.get<any>(`${environment.url}existEmail?email=${email}`)
  }

  private setToken(res: answerRegisterUser | answerLoginUser) {
    if (!!res) {
      const expDate = new Date(new Date().getTime() + +res.expiration * 1000)
      localStorage.setItem('b2b_token', res.token)
      localStorage.setItem('b2b_token-exp', expDate.toString())
      this.auth = true
    } else {
      this.logoutClearStorage()
    }
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logoutClearStorage() {
    localStorage.removeItem('b2b_token')
    localStorage.removeItem('b2b_token-exp')
    this.checkAuth.next(false)
  }

  logout(): Observable<boolean> {

    return this.http.post(`${environment.url}` + 'logout', {}).pipe(switchMap(() => {
      this.checkAuth.next(false)
      this.logoutClearStorage()
      // this.signInService.signOut()
      return of(true)
    }), catchError(err => {
      this.checkAuth.next(true)
      return of(false)
    }))
  }

  authHeader(): Observable<any> {
    return this.checkAuth
  }
}
