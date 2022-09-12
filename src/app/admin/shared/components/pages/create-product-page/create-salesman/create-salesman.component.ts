import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddProductService} from "../../../../services/addProduct/add-product.service";
import {
  RegionUkraine,
  SalesmanCreateInterface,
  SalesmanInterface
} from "../../../../services/interfaces/salesman-interface";


import {catchError, throwError} from "rxjs";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-create-salesman',
  templateUrl: './create-salesman.component.html',
  styleUrls: ['./create-salesman.component.scss']
})
export class CreateSalesmanComponent implements OnInit,AfterViewInit {
  savedSalesman:SalesmanInterface[]
  createSalesman:SalesmanCreateInterface
  regions:RegionUkraine[]
  selectedSalesman:SalesmanInterface|undefined
  @ViewChild('submitBtn', { read: ElementRef }) btn:ElementRef;
  @ViewChild('formElement', { read: ElementRef }) formEl:ElementRef;
  checkChangeSalesman:boolean = false;
  errorPhone:string;
  firstCheck:boolean = false
  form: FormGroup = new FormGroup({
    salesman: new FormControl(null),
    city: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    site: new FormControl(null),
    firm: new FormControl(null),
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    // userName: new FormControl(null, [Validators.maxLength(10), Validators.required])
  }
  )
  // city = new FormControl('',Validators.required);
  constructor(
    private createProductService:AddProductService
  ) {

  }

  ngOnInit(): void {
    this.createProductService.getSalesman().subscribe((res:SalesmanInterface[]) =>{
      this.savedSalesman = res
      if (res.length === 0){
        this.checkChangeSalesman = true
      }else {
        this.selectedSalesman = res[0]
        this.form.get('salesman')?.setValue(res[0].id)
      }


    })
    this.createProductService.getRegionUkraine().subscribe((res:RegionUkraine[]) =>{
      this.regions = res
    })

  }

  submit() {
    if (this.firstCheck){

      const {...salesman} = this.form.controls
      this.createSalesman = {
        "city_id": salesman.city.value,
        "email": salesman.email.value,
        "site": salesman.site.value,
        "firm": salesman.firm.value,
        "name":  salesman.name.value,
        "phone":  salesman.phone.value,
      }

      this.createProductService.createdSalesman(this.createSalesman).subscribe((res:SalesmanInterface) =>{
        this.savedSalesman.push(res)
        this.form.reset({
          'salesman': res.id,
          'city': null,
          'email': '',
          'site': '',
          'firm': '',
          'name': '',
          'phone': '',

        });
        this.selectedSalesman = res
        this.checkChangeSalesman = false

      })
    }

  }

  changeSalesman($event: MatSelectChange) {
    this.selectedSalesman = this.savedSalesman.find((res) =>{
      return  res.id === $event.value
    })

    if (this.form.controls.salesman.value){
      this.checkChangeSalesman = false
    }else {
      this.checkChangeSalesman = true
    }

  }
  getErrorMessageSalesmanEmail() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.controls['email'].hasError('checkEmailValidator')) {
      return `The "${this.form.controls['email'].value}" does not unique in the database`;
    }
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.formEl.nativeElement.dispatchEvent(new Event('submit'))
      this.firstCheck = true
    },0)
  }

  checkExistEmail() {
    // console.log(this.form.controls['email'].hasError('required')this.form.controls['email'].hasError('email'))
    if (!this.form.controls['email'].hasError('required') && !this.form.controls['email'].hasError('email')) {
      this.createProductService.checkEmail(this.form.controls['email'].value).pipe(catchError(err => {
        console.log('Handling error locally and rethrowing it...', err.status);
        return throwError(err);

      })).subscribe(res =>{
        this.form.controls['email'].setErrors(null)
      },error => {
        this.form.controls['email'].setErrors({checkEmailValidator:true})
        console.clear()
      })
    }
  }

  checkPhone() {
    // console.log(this.form.controls['email'].hasError('required')this.form.controls['email'].hasError('email'))
    if (!this.form.controls['phone'].hasError('required')) {
      this.createProductService.checkPhone(this.form.controls['phone'].value).pipe(catchError(err => {
        // console.log('Handling error locally and rethrowing it...', err.status);
        this.errorPhone = err.error.errors.phone[0]
        console.log(err.error.errors.phone[0],'!')
        this.form.controls['phone'].setErrors({checkPhoneValidator:true})
        return throwError(err);

      })).subscribe(res =>{
        this.form.controls['phone'].setErrors(null)
        console.clear()
      })
    }
  }

  getErrorMessageSalesmanPhone() {

    if (this.form.controls['phone'].hasError('checkPhoneValidator')) {
      return `The "${this.form.controls['phone'].value}" ${this.errorPhone}`;
    }
    return 'You must enter a value';
  }

  getErrorMessageSalesmanSite() {
    if (this.form.controls['site'].hasError('checkSiteValidator')) {
      return `The "${this.form.controls['site'].value}" The site format is invalid`;
    }
    return '';
  }

  checkSite() {
      if(this.form.controls['site'].value){
        this.createProductService.checkSite(this.form.controls['site'].value).pipe(catchError(err => {

          this.form.controls['site'].setErrors({checkSiteValidator:true})

          return throwError(err);

        })).subscribe(res =>{
          this.form.controls['site'].setErrors(null)
          console.clear()
        })
      }


  }
}
