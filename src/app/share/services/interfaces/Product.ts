export interface Products {
  "product": Product[]
  currentPage:number,
  lastPage: number,
  total:number,

}
export interface Product {

  "id": number,
  "title": string,
  "description": string,
  "price": string,
  "images": any[],
  "comments":[{
    comment:string
    id: number
    user: string
  }],
  "salesman": {
    "id": number,
    "region": string,
    "email": string,
    "site": string,
    "firm": string,
    "name": string,
    "phone": string,
    "created_at": string
  },
  "category": {
    "id": number,
    "name": string
  },
  "region": {
    "id": number,
    "name": string
  },
  "rating": number,
  "characteristics": string,
  "created_at": string


}
