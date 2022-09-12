import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {AuthService} from "../../../admin/shared/services/authService/auth.service";


// @ts-ignore
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      // console.log("CLONE intercept")
      req = req.clone({
        headers:req.headers.append('Authorization','Bearer '+this.auth.token)
      })
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          if (error.status === 401) {
            this.auth.logoutClearStorage()
            console.log("error logout status 401")
            this.router.navigate(['/account','user','login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          if (error.status === 0) {
            this.auth.logoutClearStorage()
            console.log("error logout status 0")
            this.router.navigate(['/account','user','login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(error)
        })
      )
  }

}
