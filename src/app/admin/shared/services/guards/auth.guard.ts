import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../authService/auth.service";

@Injectable()

export class AuthGuard implements CanActivate{
  constructor(
    private auth:AuthService,
    private router:Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()){
      return true
    }else {
      this.auth.logoutClearStorage()
        this.router.navigate(['/account','user','login'],{
        queryParams:{
          loginAgain:true
        }
      })
      return false
    }

  }

}
