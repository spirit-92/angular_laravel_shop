import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component, ContentChild, ContentChildren, DoCheck,
  ElementRef, OnChanges, OnDestroy,
  OnInit, QueryList, SimpleChanges,
  ViewChild, ViewChildren
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductServiceService} from "../../services/productService/product-service.service";
import {Product} from "../../services/interfaces/Product";
import {environment} from "../../../../environments/environment";
import SwiperCore, {FreeMode, Navigation, Thumbs} from "swiper";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {CommentsInterfaceGet} from "../../services/interfaces/Comments-interface";
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";

SwiperCore.use([FreeMode, Navigation, Thumbs]);


class ChildDirective {
}

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
  characteristics: Array<{
    'characteristic': string,
    'property': string
  }> = []

  @ViewChild('nav_ul') ulEl: ElementRef;
  @ViewChild('activeLine') activeLine: ElementRef;
  @ViewChild('coomentScroll') scrollElemen:ElementRef
  @ViewChildren('liComments') viewChildren!: QueryList<ChildDirective>;
  constructor(
    private router: ActivatedRoute,
    public productService: ProductServiceService,

  ) {
    this.evnUrl = environment.urlImg
  }

  ngOnInit(): void {
    this.productId = +this.router.snapshot.params['id']


    // this.productService.getProduct(this.productId).subscribe((res: Product) => {
    //   console.log(res)
    //     this.product = res
    //     let jsonP = JSON.parse(res.characteristics)
    //     for (let variable in jsonP.Characteristics) {
    //       this.characteristics.push({
    //         characteristic: variable,
    //         property: jsonP.Characteristics[variable]
    //       })
    //     }
    //
    //   }
    // )


  }

  onSwiper([swiper]: any) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
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






}
