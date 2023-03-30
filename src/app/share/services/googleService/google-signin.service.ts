import { Injectable } from '@angular/core';
import {Observable, of, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {
  // private auth2 : gapi.auth2.GoogleAuth
  // private subject = new ReplaySubject<gapi.auth2.GoogleUser | null>(2)
  // constructor(
  //
  // ) {
  //   // gapi.load('auth2', ()=>{
  //   // this.auth2 = gapi.auth2.init({
  //   //     client_id:'276670737870-3qne4subcq0ib8i2cvd1kv6qoen43b8h.apps.googleusercontent.com',
  //   //   scope: "email",
  //   //
  //   //   })
  //   // })
  // }
  // public signin():Observable<Promise<gapi.auth2.GoogleUser>>{
  //  // return  of(this.auth2.signIn({
  //  //
  //  //  }).then(user =>{
  //  //    // console.log(user,'!_!')
  //  //
  //  //    this.subject.next(user)
  //  //    return user
  //  //  }).catch((err)=>{
  //  //    console.log(err,'!_!')
  //  //   return err
  //  //    // this.subject.next(null)
  //  //  }))
  // }
  // public signOut(){
  //   // this.auth2.signOut().then(()=>{
  //   //   this.subject.next(null)
  //   // })
  // }
  // public observable():Observable<gapi.auth2.GoogleUser | null>{
  //   return  this.subject.asObservable()
  //
  //
  // }

}
