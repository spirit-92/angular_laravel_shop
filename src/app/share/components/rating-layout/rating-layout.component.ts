import {Component, Input, OnInit} from '@angular/core';
import {ProductServiceService} from "../../services/productService/product-service.service";
import {Product} from "../../services/interfaces/Product";
import {AuthService} from "../../../admin/shared/services/authService/auth.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-rating-layout',
  templateUrl: './rating-layout.component.html',
  styleUrls: ['./rating-layout.component.scss']
})
export class RatingLayoutComponent implements OnInit {
  @Input() rating: {
    product_id: number,
    product_rating: number
  }
  @Input() isAuth: boolean
  @Input() product: Product
  @Input() productService: ProductServiceService

  constructor(
    private auth: AuthService,
    private ngxService: NgxUiLoaderService,
  ) {
  }

  ngOnInit(): void {
    this.isAuth = this.auth.isAuthenticated()

  }

  counterRate(i: number) {
    return new Array(Math.round(i == 0 || i == null ? 1 : i));
  }

  counterRateDef(rating: number) {
    return new Array(Math.round(5 - rating === 5 ? 4 : 5 - rating));
  }

  saveRatingPlus(number: number, idProduct: number) {

      let saveRating = (this.rating.product_rating === null ? 1 : this.rating.product_rating) + (number === 0 ? 1 : number)
      this.saveRating(saveRating,idProduct)


  }

  saveRatingMinus(saveRating: number,idProduct: number) {
    this.saveRating(saveRating,idProduct)
  }

  saveRating(rate: number,idProduct:number) {
    if (this.isAuth) {
      this.ngxService.start()
      console.log(rate)
      this.productService.saveProductRating(rate, idProduct).subscribe(res => {
        console.log(res)
        this.product.rating = res.averageRating
        this.ngxService.stop()
      }, error => {
        this.ngxService.stop()
      }, () => {
        this.ngxService.stop()
      })
    } else {
      this.ngxService.stop()
    }
  }
}
