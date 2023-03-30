import { Component, OnInit } from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../../admin/shared/services/authService/auth.service";
import {Router} from "@angular/router";
import {ProductServiceService} from "../../services/productService/product-service.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialUser
} from "@abacritt/angularx-social-login";
@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit {
  isAuth:boolean = false;
  user: SocialUser | undefined;
  constructor(
    private auth:AuthService,
    private route:Router,
    private prodService: ProductServiceService,
    private ngxService: NgxUiLoaderService,
    private authService: SocialAuthService,

  ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated()
    this.auth.checkAuth.subscribe(res =>{
      this.isAuth = res
    })
    this.authService.authState.subscribe((user) => {
      this.user = user;
      localStorage.setItem('userObject', JSON.stringify(user));
      console.log(this.user)

    });

  }

  onClick(event: MouseEvent) {
    event.preventDefault();
  }

  logout() {
    this.auth.logout().subscribe(res =>{
      this.authService.signOut();
      console.log(res)
      this.route.navigate(['account','user','login'])
    })
  }

  resetCategory() {
    this.ngxService.start()
    this.prodService.productByCategory(0)
  }
}
