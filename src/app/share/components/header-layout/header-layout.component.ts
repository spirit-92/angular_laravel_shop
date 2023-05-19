import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../admin/shared/services/authService/auth.service";
import {Router} from "@angular/router";
import {ProductServiceService} from "../../services/productService/product-service.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {
  SocialAuthService,
  SocialUser
} from "@abacritt/angularx-social-login";
import {BasketService} from "../../services/basketService/basket.service";
import {BasketData} from "../../services/interfaces/basket-interface";
@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit,AfterViewChecked {
  isAuth:boolean = false;
  user: SocialUser | undefined;

  @ViewChild('countBasket', { static: false }) countBasketRef: ElementRef;
  @ViewChild('basketBg', { static: false }) bgBasketRef: ElementRef;
  constructor(
    private auth:AuthService,
    private route:Router,
    private prodService: ProductServiceService,
    private ngxService: NgxUiLoaderService,
    private authService: SocialAuthService,
    public basketService:BasketService
  ) { }

  ngOnInit(): void {

    this.auth.checkAuth.subscribe(res =>{
      this.isAuth = res
    })

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
  deleteBasket(product_id:number){
    this.basketService.deleteBasket(product_id)
  }
  ngAfterViewChecked() {
    if (this.countBasketRef && this.countBasketRef.nativeElement) {
      const countBasketElement = this.countBasketRef.nativeElement;
      this.bgBasketRef.nativeElement.style.width = countBasketElement.offsetWidth + 'px';
      this.bgBasketRef.nativeElement.style.height = countBasketElement.offsetWidth + 'px';

      this.bgBasketRef.nativeElement.style.top = countBasketElement.offsetHeight/2+30/2+'px'

    }
  }


}
