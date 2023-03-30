import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ProductServiceService} from "../../services/productService/product-service.service";
import {Product, Products} from "../../services/interfaces/Product";
import {environment} from "../../../../environments/environment";
import {LegacyPageEvent as PageEvent} from "@angular/material/legacy-paginator";
import {AuthService} from "../../../admin/shared/services/authService/auth.service";
import {tap} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-product-layout',
  templateUrl: './main-product-layout.component.html',
  styleUrls: ['./main-product-layout.component.scss']
})
export class MainProductLayoutComponent implements OnInit {

  public products: Products
  environments: string;
  length = 100;
  pageSize = 9;
  pageSizeOptions: number[] = [6, 9, 12, 15, 18, 21, 30];
  isAuth: boolean;
  category_id = 0

  constructor(
    public productService: ProductServiceService,

    private ngxService: NgxUiLoaderService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.ngxService.start()
    this.productService.getAllProduct().pipe(tap(() => {

    })).subscribe((res: Products) => {
      this.length = res.total
      this.products = res
      this.pageSize = res.product.length
      this.ngxService.stop()
    }, error => {
      console.log(error)
      this.ngxService.stop()
    }, () => {
      this.ngxService.stop()
    })
    this.environments = environment.urlImg
    this.productService.showProductByCategory.subscribe((category_id: number) => {
      this.category_id = category_id

      this.productService.getAllProduct(1, 9, this.category_id).subscribe((prod: Products) => {
        this.length = prod.total
        this.products = prod
        this.pageSize = prod.product.length
        this.ngxService.stop()
      }, error => {
        this.ngxService.stop()
      }, () => {
      })
      this.ngxService.stop()

    })

  }
  confirmPageChange($event: PageEvent) {

    this.productService.getAllProduct($event.pageIndex + 1, $event.pageSize, this.category_id).subscribe((res: Products) => {
      this.length = res.total
      this.products = res
      this.pageSize = res.product.length
    })


  }


  navigateCardProduct($event: MouseEvent, idCard: number) {
    if (!($event.target as Element).classList.contains('rating_icon')) {
      this.route.navigate(['product-card/', idCard])
    }
  }
}
