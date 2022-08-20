import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ProductServiceService} from "../../services/productService/product-service.service";
import {Product} from "../../services/interfaces/Product";
import {environment} from "../../../../environments/environment";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../../admin/shared/services/authService/auth.service";
import {tap} from "rxjs";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-main-product-layout',
  templateUrl: './main-product-layout.component.html',
  styleUrls: ['./main-product-layout.component.scss']
})
export class MainProductLayoutComponent implements OnInit {

  public products: Product
  environments: string;
  length = 100;
  pageSize = 9;
  pageSizeOptions: number[] = [6, 9, 12, 15, 18, 21, 30];
  isAuth: boolean;
  category_id = 0

  constructor(
    private productService: ProductServiceService,
    private auth: AuthService,
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit(): void {
    this.ngxService.start()
    this.productService.getAllProduct().pipe(tap(() => {
      this.isAuth = this.auth.isAuthenticated()
    })).subscribe((res: Product) => {
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

      this.productService.getAllProduct(1, 9, this.category_id).subscribe((prod: Product) => {
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

  counterRate(i: number) {
    return new Array(Math.round(i == 0 ? 1 : i));
  }

  counterRateDef(rating: number) {
    return new Array(Math.round(5 - rating === 5 ? 4 : 5 - rating));
  }

  confirmPageChange($event: PageEvent) {

    this.productService.getAllProduct($event.pageIndex + 1, $event.pageSize, this.category_id).subscribe((res: Product) => {
      this.length = res.total
      this.products = res
      this.pageSize = res.product.length
    })

  }


  saveRating(number: number, idProduct: number, product: any) {
    if (this.isAuth) {
      let rating = Math.round(number)
      this.productService.saveProductRating(rating, idProduct).subscribe(res => {
        product.rating = res.averageRating
      })
    }
  }

}
