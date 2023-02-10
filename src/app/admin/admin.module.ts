import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";

import { LoginPageComponent } from './shared/components/pages/login-page/login-page.component';
import { MainPageComponent } from './shared/components/pages/main-page/main-page.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistrationPageComponent } from './shared/components/pages/registration-page/registration-page.component';
import {HttpClientModule} from "@angular/common/http";
import { InfoUserPageComponent } from './shared/components/pages/info-user-page/info-user-page.component';

import {AuthGuard} from "./shared/services/guards/auth.guard";
import {GoogleSigninService} from "../share/services/googleService/google-signin.service";
import { CreateSalesmanComponent } from './shared/components/pages/create-product-page/create-salesman/create-salesman.component';
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import { CreateProductComponent } from './shared/components/pages/create-product-page/create-product/create-product.component';
// import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";



@NgModule({
  declarations: [
    LoginPageComponent,
    MainPageComponent,
    RegistrationPageComponent,
    InfoUserPageComponent,
    CreateSalesmanComponent,
    CreateProductComponent,

  ],
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/account/user/login', pathMatch: 'full'},
          {
            path: 'user', component: MainPageComponent,
            children: [
              {path: '', redirectTo: '/account/user/login', pathMatch: 'full'},
              {path: 'login', component: LoginPageComponent},
              {path: 'registration', component: RegistrationPageComponent},
              {path: 'create-product', component: CreateSalesmanComponent, canActivate: [AuthGuard]},
              {path: 'info', component: InfoUserPageComponent, canActivate: [AuthGuard]},
            ]
          }
        ]
      }
    ]),
    MatSelectModule
  ],
  providers: [AuthGuard],
})
export class AdminModule { }
