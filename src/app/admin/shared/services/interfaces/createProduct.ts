export interface CreateProduct{
  'title':string,
  'description':string,
  'price':number,
  'salesman_id':number,
  'category_id':number,
  'region_id':number,
  'characteristics':any,
}

export interface saveJson {
  "Characteristics": any
}
