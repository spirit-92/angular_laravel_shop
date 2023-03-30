import {Component, OnInit} from '@angular/core';
import {NavbarServiceService} from "../../services/mainService/navbar-service.service";
import {CategoriesInterface} from "../../services/interfaces/Categories-interface";
import {environment} from "../../../../environments/environment";

import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductServiceService} from "../../services/productService/product-service.service";
import {AuthService} from "../../../admin/shared/services/authService/auth.service";



@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.scss']
})
export class NavbarLayoutComponent implements OnInit {
  categorise: CategoriesInterface[];
  environments: any;


  constructor(
    private navService: NavbarServiceService,
    private prodService: ProductServiceService,
    private ngxService: NgxUiLoaderService,

  ) {
  }

  ngOnInit(): void {

    this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId

    this.navService.getCategories().subscribe((categories: CategoriesInterface[]) => {
      this.categorise = categories
      this.ngxService.stopLoader("loader-01");
    })


    this.environments = environment.urlImg
  }


  showProductByCategory(id: number) {
    this.ngxService.start()
    this.prodService.productByCategory(id)

  }
}
