export interface SalesmanInterface {
  "id": number,
  "city": string,
  "email": string,
  "site": string,
  "firm": string,
  "name": string,
  "phone": string
}
export interface RegionUkraine {
  "id": number,
  "region": string,

}
export interface SalesmanCreateInterface{
  'city_id':string,
  'email': string,
  'site'?: string,
  'firm'?: string,
  'name': string,
  'phone': string,
}
