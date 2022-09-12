import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {RegionUkraine, SalesmanCreateInterface, SalesmanInterface} from "../interfaces/salesman-interface";
import {CategoriesInterface} from "../../../../share/services/interfaces/Categories-interface";
import {CreateProduct} from "../interfaces/createProduct";


@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(
    private http:HttpClient
  ) {}

  public  getSalesman():Observable<SalesmanInterface[]>{
    return this.http.get<SalesmanInterface[]>(`${environment.url}admin_sales_man`)
  }
  public  getRegionUkraine():Observable<RegionUkraine[]>{
    return this.http.get<RegionUkraine[]>(`${environment.url}admin_region_ukraine`)
  }
  public getCategory():Observable<CategoriesInterface[]>{
    return this.http.get<CategoriesInterface[]>(`${environment.url}admin_categories_product`)
  }
  public checkTitle(title:string):Observable<any>{
    return this.http.get<any>(`${environment.url}admin_product_checkValidate/title?title=${title}`)
  }
  public checkPrice(price:number):Observable<any>{
    return this.http.get<any>(`${environment.url}admin_product_checkValidate/price?price=${price}`)
  }
  public checkImage(image:any):Observable<any>{
    return this.http.post<any>(`${environment.url}admin_product_checkValidate/image`,image)
  }
  public checkEmail(email:string):Observable<any>{
    return this.http.get<any>(`${environment.url}admin_sales_man_checkValidate/email?email=${email}`)
  }
  public checkPhone(phone:string):Observable<any>{
    return this.http.get<any>(`${environment.url}admin_sales_man_checkValidate/phone?phone=${phone}`)
  }
  public checkSite(site:string):Observable<any>{
    return this.http.get<any>(`${environment.url}admin_sales_man_checkValidate/site?site=${site}`)
  }
  public createdSalesman(salesman:SalesmanCreateInterface):Observable<SalesmanInterface>{
    return this.http.post<SalesmanInterface>(`${environment.url}admin_sales_man`,salesman)
  }
  public createdProduct(product:any):Observable<any>{
    return this.http.post<any>(`${environment.url}admin_product`,product)
  }
}
