export interface RegistrationInterface {
  name:string,
  email:string,
  password:string,
  auth?:string,
  password_confirmation:string
}
export interface LoginInterface {
  email:string,
  password:string,
}
export interface answerLoginUser{
  user:string,
  token: string,
  expiration: number
}
export interface answerRegisterUser{
  "user": {
    "name": string,
    "email": string,
    "updated_at": string,
    "created_at": string
    "id": number
  },
  "token": string,
  "expiration": number
}
