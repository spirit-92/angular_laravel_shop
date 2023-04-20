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
  "name": string,

}
export interface SalesmanCreateInterface{
  'region':string,
  'email': string,
  'site'?: string,
  'firm'?: string,
  'name': string,
  'phone': string,
}
