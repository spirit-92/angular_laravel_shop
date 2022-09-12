import {AbstractControl} from "@angular/forms";

export function ValidateFirstSpace(control: AbstractControl) {
  // console.log(control.value.trim())
  if (control.value.split('')[0] === ' '){
    return { pattern: true };
  }

  return null;
}
