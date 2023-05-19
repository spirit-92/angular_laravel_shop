import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {finalize, Observable, Subject, tap} from "rxjs";
import {Product, Products} from "../interfaces/Product";
import {environment} from "../../../../environments/environment";
import {CommentsInterfaceGet, CommentsInterfaceSave} from "../interfaces/Comments-interface";
import {NgxUiLoaderService} from "ngx-ui-loader";


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  showProductByCategory = new Subject<number>()
  constructor(
    private http:HttpClient,
    private ngxService: NgxUiLoaderService,
  ) { }

  public getAllProduct(page=1,showPage=9,category_id= 0):Observable<Products>{
    return this.http.get<Products>(`${environment.url}product?category_id=${category_id}&page=${page}&showPage=${showPage}`)
  }

  public getProductByCategory(category_id:number,page=1,showPage=9):Observable<Product>{
    return this.http.get<Product>(`${environment.url}product?category_id=${category_id}&page=${page}&showPage=${showPage}`)
  }
  public saveProductRating(rating: number,id_product:number):Observable<any>{
    return this.http.post(`${environment.url}product/save/rating`,{
      id_product,rating

    })
  }

  public productByCategory(product:number){
    this.showProductByCategory.next(product)
  }
  public productSearch(value:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.url}product/search?name=${value}`)
  }

  public getProduct(productId:number):Observable<Product>{
    return this.http.get<Product>(`${environment.url}product/${productId}`)
  }
  public addComment(comment:CommentsInterfaceSave):Observable<CommentsInterfaceGet>{
    this.ngxService.start()
    return this.http.post<CommentsInterfaceGet>(`${environment.url}product/save/comment`,comment).pipe(
      tap((res: CommentsInterfaceGet)=>{
        return res
      }),finalize(()=>{
        this.ngxService.stop()
      })
    )
  }
}
