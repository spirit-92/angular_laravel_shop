import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../authService/auth.service";

@Injectable()

export class Auth2Guard implements CanActivate{
  constructor(
    private auth:AuthService,
    private router:Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated()){
      return true
    }else {
      this.router.navigate(['/account','user','info'])
      return false
    }

  }

}
