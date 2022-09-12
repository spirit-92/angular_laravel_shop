import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CategoriesInterface} from "../interfaces/Categories-interface";

@Injectable({
  providedIn: 'root'
})
export class NavbarServiceService {

  constructor(
    private http:HttpClient
  ) { }

  getCategories():Observable<CategoriesInterface[]>{
    return this.http.get<CategoriesInterface[]>(`${environment.url}categories_product`)
  }
}
