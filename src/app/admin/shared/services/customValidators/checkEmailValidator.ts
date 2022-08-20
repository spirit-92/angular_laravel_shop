import {FormGroup} from "@angular/forms";
import {AuthService} from "../authService/auth.service";


export function CheckEmailValidator(controlName:string,http:AuthService){
  return(formGroup:FormGroup)=>{

    const control = formGroup.controls[controlName];
    // const matchingControl = formGroup.controls[matchingControlName]
    console.log('!_!')
  //     console.log(control.value)
  //   if (matchingControl.errors && !matchingControl.errors['checkEmailValidator']){
  //     return
  //   }
   http.checkEmail(control.value).subscribe(res =>{
     console.log(res)
   },error => {
     console.log(error)
   })
    if (control.value ){
      control.setErrors({checkEmailValidator:true})
    }
  //   else {
  //     matchingControl.setErrors(null);
  //   }
  }
}
