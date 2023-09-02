import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./share/components/main-layout/main-layout.component";
import {MainPageComponent} from "./share/pages/main-page/main-page.component";
import {CardProductPageComponent} from "./share/pages/card-product-page/card-product-page.component";
import {LoginPageComponent} from "./admin/shared/components/pages/login-page/login-page.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent},
      {path: 'account/user/login', component: LoginPageComponent},
      {path: 'product-card/:id', component: CardProductPageComponent},
    ]
  },
  {path: 'account', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules,
      paramsInheritanceStrategy: 'always'
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
