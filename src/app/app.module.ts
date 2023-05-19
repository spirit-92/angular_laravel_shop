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

import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./share/services/interceptor/auth.interceptor";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import { NavbarLayoutComponent } from './share/components/navbar-layout/navbar-layout.component';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,

} from '@abacritt/angularx-social-login';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  POSITION,
  SPINNER,
  PB_DIRECTION,
  NgxUiLoaderHttpModule,
} from "ngx-ui-loader";

import { MainProductLayoutComponent } from './share/components/main-product-layout/main-product-layout.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { CardProductPageComponent } from './share/pages/card-product-page/card-product-page.component';
import { SwiperModule } from 'swiper/angular';
import { AddCommentesLayoutComponent } from './share/components/add-commentes-layout/add-commentes-layout.component';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {LoginPageComponent} from "./admin/shared/components/pages/login-page/login-page.component";
import {NgOptimizedImage} from "@angular/common";
import { SearchProductComponent } from './share/components/search-product/search-product.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatMenuModule} from "@angular/material/menu";






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
    LoginPageComponent,
    SearchProductComponent


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
    SocialLoginModule,
    NgOptimizedImage,
    MatAutocompleteModule,
    MatMenuModule,

  ],

  providers: [
    INTERCEPTOR_PROVIDER,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('922773321049-pbni6m7ucnqeodmkfr60rt1i0verojop.apps.googleusercontent.com',{
              oneTapEnabled:false,
              scopes: 'https://www.googleapis.com/auth/calendar.readonly'
            }),
          },
        ],
      } as SocialAuthServiceConfig,
    },

  ],

  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }

