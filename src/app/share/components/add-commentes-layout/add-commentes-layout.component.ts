import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidateFirstSpace} from "../../../admin/shared/services/customValidators/checkForstSpace";
import {ProductServiceService} from "../../services/productService/product-service.service";
import {CommentsInterfaceGet, CommentsInterfaceSave} from "../../services/interfaces/Comments-interface";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {finalize, tap} from "rxjs";

@Component({
  selector: 'app-add-commentes-layout',
  templateUrl: './add-commentes-layout.component.html',
  styleUrls: ['./add-commentes-layout.component.scss'],

})

export class AddCommentesLayoutComponent implements OnInit {
  form: FormGroup
  @Input() idProduct: number
  @Output() comment:EventEmitter<CommentsInterfaceGet> = new EventEmitter<CommentsInterfaceGet>()
  saveCommets:CommentsInterfaceSave
  constructor(
    public productService: ProductServiceService,
    private ngxService: NgxUiLoaderService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'comments': new FormControl('', [ValidateFirstSpace,Validators.maxLength(5000),Validators.required])
    })
    this.saveCommets =  {
      id_product:this.idProduct,
      comment:''
    }
  }

  submit() {
    this.saveCommets.comment = this.form.get('comments')?.value
      this.ngxService.start()
    this.productService.addComment(this.saveCommets).subscribe((res:CommentsInterfaceGet) =>{
      console.log(res,'!!')
      this.comment.emit(res)
      this.ngxService.stop()
      this.form.get('comments')?.setValue('')
    })


    // this.http.post<BasketData>(`${environment.url}basket`, {
    //   'product_id': product_id,
    //   'count': count
    // }).pipe(
    //   tap((basket: BasketData) => {
    //     console.log(basket);
    //     this.cartSubject.next(basket);
    //   }),
    //   finalize(() => {
    //     this.ngxService.stop();
    //   })
    // ).subscribe();

  }


  getErrorMessageInvalid() {
    if (this.form.get('comments')?.hasError('pattern')) {
      return `field must not start with a space`;
    }
    if (this.form.get('comments')?.hasError('maxlength')) {
      return `maximum allowed characters 5000`;
    }
    if (this.form.get('comments')?.hasError('required')) {
      return `required`;
    }

    return '';
  }
}
