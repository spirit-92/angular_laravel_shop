export interface Product {
  "product": [
    {
      "id": number,
      "title": string,
      "description": string,
      "price": string,
      "iamges": any,
      "salesman": {
        "id": number,
        "city": string,
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
        "region": string
      },
      "rating": number,
      "characteristics": string,
      "created_at": string

    }
  ]
  currentPage:number,
  lastPage: number,
  total:number,

}
