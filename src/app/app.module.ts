import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './share/components/main-layout/main-layout.component';
import { MainPageComponent } from './share/pages/main-page/main-page.component';
import {RatingLayoutComponent} from "./share/components/rating-layout/rating-layout.component";
import { HeaderLayoutComponent } from './share/components/header-layout/header-layout.component';
import { FooterLayoutComponent } from './share/components/footer-layout/footer-layout.component';
import { AdminLayoutComponent } from './admin/shared/components/admin-layout/admin-layout.component';
import {AdminModule} from "./admin/admin.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./share/services/interceptor/auth.interceptor";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import { NavbarLayoutComponent } from './share/components/navbar-layout/navbar-layout.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  POSITION,
  SPINNER,
  PB_DIRECTION,
  NgxUiLoaderHttpModule,
} from "ngx-ui-loader";

import { MainProductLayoutComponent } from './share/components/main-product-layout/main-product-layout.component';
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { CardProductPageComponent } from './share/pages/card-product-page/card-product-page.component';
import { SwiperModule } from 'swiper/angular';
import { AddCommentesLayoutComponent } from './share/components/add-commentes-layout/add-commentes-layout.component';







const INTERCEPTOR_PROVIDER:Provider = {
  provide:HTTP_INTERCEPTORS ,
  multi:true,
  useClass:AuthInterceptor
}
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: "#ffffff",
  bgsPosition: POSITION.centerCenter,
  bgsColor:'white',
  bgsSize: 100,
  logoSize:120,
  gap:120,
  fastFadeOut:true,
  blur:4,
  overlayColor:'rgba(0,0,0,.7)',
  bgsType: SPINNER.threeStrings, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    AdminLayoutComponent,
    NavbarLayoutComponent,
    MainProductLayoutComponent,
    CardProductPageComponent,
    RatingLayoutComponent,
    AddCommentesLayoutComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatListModule,
        MatSidenavModule,
        MatIconModule,
        MatProgressSpinnerModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderHttpModule,
        MatCardModule,
        MatPaginatorModule,
        FormsModule,
        MatInputModule,
        SwiperModule,
        ReactiveFormsModule,
        SocialLoginModule
    ],
  providers: [
    INTERCEPTOR_PROVIDER,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('276670737870-3qne4subcq0ib8i2cvd1kv6qoen43b8h.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
