import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductServiceService} from "../../services/productService/product-service.service";
import {Product} from "../../services/interfaces/Product";
import {environment} from "../../../../environments/environment";
import SwiperCore, {FreeMode, Navigation, Thumbs} from "swiper";
import {CommentsInterfaceGet} from "../../services/interfaces/Comments-interface";
import {BasketService} from "../../services/basketService/basket.service";
import {AuthService} from "../../../admin/shared/services/authService/auth.service";



SwiperCore.use([FreeMode, Navigation, Thumbs]);



@Component({
  selector: 'app-card-product-page',
  templateUrl: './card-product-page.component.html',
  styleUrls: ['./card-product-page.component.scss']
})
export class CardProductPageComponent implements OnInit{
  productId: number
  product: Product
  thumbsSwiper: any;
  evnUrl: string;
  showNav: string = 'comments'
  checkUlRender = true;
  isAuth:boolean = false
  characteristics: Array<{
    'name': string,
    'value': string
  }> = []

  @ViewChild('nav_ul') ulEl: ElementRef;
  @ViewChild('activeLine') activeLine: ElementRef;
  @ViewChild('coomentScroll') scrollElemen:ElementRef

  constructor(
    private router: ActivatedRoute,
    public productService: ProductServiceService,
    private basketService:BasketService,
    private auth:AuthService,
  ) {
    this.evnUrl = environment.urlImg
  }

  ngOnInit(): void {
    this.productId = +this.router.snapshot.params['id']

   this.isAuth =   this.auth.isAuthenticated()
    console.log(this.isAuth)
    this.productService.getProduct(this.productId).subscribe((res: Product) => {
        console.log(res)
        this.product = res
       this.characteristics = JSON.parse(res.characteristics)
    })
  }
  activeNav($event: MouseEvent) {
    let el = $event.target as Element
    let ulLeft = this.ulEl.nativeElement.getBoundingClientRect().left

    if (el.tagName === 'LI') {
      this.showNav = el.id
      let leftLi = el.getBoundingClientRect().left

      this.activeLine.nativeElement.style.left = leftLi - ulLeft + 'px'
      this.activeLine.nativeElement.style.width = el.getBoundingClientRect().width + 'px'
    }
  }

  getControlsOnStyleDisplay() {

    if (this.ulEl && this.checkUlRender) {
      this.showNav = this.ulEl.nativeElement.children[1].id
      this.activeLine.nativeElement.style.width = this.ulEl.nativeElement.children[1].getBoundingClientRect().width + 'px'
      this.checkUlRender = false
    }
  }

  addComment(comment: CommentsInterfaceGet) {
    this.product.comments.push(comment)
    setTimeout(()=>{
      this.scrollElemen.nativeElement.scrollTop = this.scrollElemen.nativeElement.scrollHeight
    },0)

  }


  addBasket(id: number,count:number) {
    this.basketService.addBasket(id,count)

  }
}
