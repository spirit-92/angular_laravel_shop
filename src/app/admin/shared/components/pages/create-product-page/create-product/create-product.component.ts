import {Component, Input, OnInit} from '@angular/core';
import {RegionUkraine, SalesmanInterface} from "../../../../services/interfaces/salesman-interface";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddProductService} from "../../../../services/addProduct/add-product.service";
import {CategoriesInterface} from "../../../../../../share/services/interfaces/Categories-interface";
import {catchError, throwError} from "rxjs";
import {ValidateFirstSpace} from "../../../../services/customValidators/checkForstSpace";
import {CreateProduct, saveJson} from "../../../../services/interfaces/createProduct";
import {NgxUiLoaderService} from "ngx-ui-loader";

interface jsonFeatures {
  id: number,
  name: string,
  features: string
}


interface indexX {
  id: number,

}

interface errorImages {
  status: boolean,
  error: []
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @Input('salesman') salesman: SalesmanInterface
  @Input('regions') regions: RegionUkraine[]

  categories: CategoriesInterface[]
  errorImages: errorImages[] = [{
    status: false,
    error: []
  }, {
    status: false,
    error: []
  }, {
    status: false,
    error: []
  }, {
    status: false,
    error: []
  }]
  saveProduct: CreateProduct

  saveJson: saveJson = {
    Characteristics: {}
  }
  count = 1
  countControlsFeatures: indexX[] = [
    {id: 1}
  ]
  jsonFeatures: jsonFeatures[] = []

  form: FormGroup
  formFeatures: FormGroup

  constructor(
    private createProductService: AddProductService,
    private ngxService: NgxUiLoaderService
  ) {

  }

  ngOnInit(): void {
    this.createProductService.getCategory().subscribe((res: CategoriesInterface[]) => this.categories = res)

    this.form = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'price': new FormControl('', [Validators.required, Validators.min(1)]),
      'category': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'name_1': new FormControl({value: '', disabled: true}),
      'name_2': new FormControl({value: '', disabled: true}),
      'name_3': new FormControl({value: '', disabled: true}),
      'name_4': new FormControl({value: '', disabled: true}),
      'image_1': new FormControl(''),
      'image_2': new FormControl(''),
      'image_3': new FormControl(''),
      'image_4': new FormControl(''),
    })
    this.formFeatures = new FormGroup({})

    this.formFeatures.addControl(`featuresName-1`, new FormControl('', [Validators.required, ValidateFirstSpace]));
    this.formFeatures.addControl(`features-1`, new FormControl('', [Validators.required, ValidateFirstSpace]));

  }

  onFileChange(event: Event, img_id: number) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      if (fileList.length > 0) {
        const file = fileList[0];
        this.checkFileError(file, img_id)
        this.form.get(`name_${img_id}`)?.setValue(file.name)
        this.form.get(`image_${img_id}`)?.setValue(file)
      }
    }
  }

  checkFileError(file: File, id: number) {

    let formdata = new FormData()
    formdata.append("image", file);

    this.createProductService.checkImage(formdata).pipe(catchError(err => {
      this.errorImages[id - 1].error = err.error.errors.image
      console.log('Handling error locally and rethrowing it...', err.error.errors);
      return throwError(err);

    })).subscribe(res => {
      this.form.controls[`name_${id}`].setErrors(null)
      this.errorImages[id - 1].status = false
    }, error => {
      this.errorImages[id - 1].status = true
      this.form.controls[`name_${id}`].setErrors({checkImage: true})
      this.getErrorMessageImageInvalid(id)
      // console.clear()
    })
  }

  getErrorMessageTitle() {
    if (this.form.controls['title'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.controls['title'].hasError('checkTitleValidator')) {
      return `The "${this.form.controls['title'].value}" does not unique in the database`;
    }
    return this.form.controls['title'].hasError('title') ? 'Not a valid email' : '';
  }

  getErrorMessagePrice() {
    if (this.form.controls['price'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.controls['price'].hasError('checkPriceValidator')) {
      return `The "${this.form.controls['price'].value}" does not valid example x.xx`;
    }
    return this.form.controls['price'].hasError('price') ? 'does not valid example x.xx' : '';
  }

  checkExistPrice() {
    // console.log(this.form.controls['email'].hasError('required')this.form.controls['email'].hasError('email'))
    if (!this.form.controls['price'].hasError('required')) {
      const f = (x: any) => ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0));
      if (f(this.form.controls['price'].value) === 1) {
        this.form.controls['price'].setValue(this.form.controls['price'].value.toFixed(2))
      }

      this.createProductService.checkPrice(this.form.controls['price'].value).pipe(catchError(err => {
        console.log('Handling error locally and rethrowing it...', err.status);
        return throwError(err);

      })).subscribe(res => {
        this.form.controls['price'].setErrors(null)
      }, error => {
        this.form.controls['price'].setErrors({checkPriceValidator: true})
        // console.clear()
      })
    }
  }

  checkExistTitle() {
    // console.log(this.form.controls['email'].hasError('required')this.form.controls['email'].hasError('email'))
    if (!this.form.controls['title'].hasError('required')) {
      this.createProductService.checkTitle(this.form.controls['title'].value).pipe(catchError(err => {
        console.log('Handling error locally and rethrowing it...', err.status);
        return throwError(err);

      })).subscribe(res => {
        this.form.controls['title'].setErrors(null)
      }, error => {
        this.form.controls['title'].setErrors({checkTitleValidator: true})
        // console.clear()
      })
    }
  }


  submit() {
    this.ngxService.start()
    this.addJson()
    const formData = new FormData()

    const promise1 = new Promise((resolve, reject) => {
      for (let i = 0; i < this.countControlsFeatures.length; i++) {
        this.formFeatures.removeControl(`featuresName-${i + 1}`)
        this.formFeatures.removeControl(`features-${i + 1}`)
        if (i === this.countControlsFeatures.length - 1) {
          resolve('ok')
        }
      }
    });
    this.formFeatures.addControl(`featuresName-1`, new FormControl('', [Validators.required, ValidateFirstSpace]));
    this.formFeatures.addControl(`features-1`, new FormControl('', [Validators.required, ValidateFirstSpace]));
    promise1.then((res) => {
      this.countControlsFeatures = [
        {id: 1}
      ]
    });


    this.saveProduct = {
      'title': this.form.get('title')?.value,
      'description': this.form.get('description')?.value,
      'price': this.form.get('price')?.value,
      'salesman_id': this.salesman.id,
      'category_id': this.form.get('category')?.value,
      'region_id': this.form.get('city')?.value,
      'characteristics': JSON.stringify(this.saveJson),
    }
    let form: any = this.saveProduct
    for (let key in form) {
      formData.append(key, form[key]);
    }

    for (let i = 0; i < 4; i++) {
      if (this.form.get(`image_${i + 1}`)?.value) {
        let file: any = this.form.get(`image_${i + 1}`)?.value
        formData.append(`image[${i}]`, file);
      }

      // ещё какие-то выражения
    }
    this.createProductService.createdProduct(formData).subscribe(res => {
      console.log(res)
      this.ngxService.stop()
      this.form.reset()
      for (let i = 0; i < this.countControlsFeatures.length; i++) {
        this.formFeatures.removeControl(`featuresName-${i + 1}`)
        this.formFeatures.removeControl(`features-${i + 1}`)
      }


    }, error => {
      this.ngxService.stop()
    })
    // console.log(this.saveProduct)
  }

  addFeatures() {

    if (this.countControlsFeatures.length === 0) {
      this.countControlsFeatures = [{id: 1}]
      this.formFeatures.addControl(`featuresName-1`, new FormControl('', [Validators.required, ValidateFirstSpace]));
      this.formFeatures.addControl(`features-1`, new FormControl('', [Validators.required, ValidateFirstSpace]));

    } else {
      this.countControlsFeatures.push({id: this.countControlsFeatures[this.countControlsFeatures.length - 1].id + 1})
      this.formFeatures.addControl(`featuresName-${this.countControlsFeatures[this.countControlsFeatures.length - 1].id}`, new FormControl('', [Validators.required, ValidateFirstSpace]));
      this.formFeatures.addControl(`features-${this.countControlsFeatures[this.countControlsFeatures.length - 1].id}`, new FormControl('', [Validators.required, ValidateFirstSpace]))
    }


  }

  setErrorUnicName(controls: FormControl[], setError: boolean) {
    if (setError) {
      controls.forEach(res => {
        res.setErrors({checkNameValidator: true})
      })
    } else {
      // console.log(controls)
      controls.forEach(res => {

        if (res.hasError('pattern')) {

        } else {
          res.setErrors(null)
        }
      })
    }

  }

  addJson() {
    this.jsonFeatures = [];
    this.saveJson.Characteristics = {}
    this.countControlsFeatures.forEach(res => {
      const saveFeatures: jsonFeatures = {
        id: res.id,
        name: this.formFeatures.get(`featuresName-${res.id}`)?.value,
        features: this.formFeatures.get(`features-${res.id}`)?.value
      }
      this.jsonFeatures.push(saveFeatures)
    })
    this.jsonFeatures.forEach(res => {

      this.saveJson.Characteristics[res.name] = res.features

    })

  }

  deleteFeatures(idx: number) {
    this.formFeatures.removeControl(`featuresName-${idx}`)
    this.formFeatures.removeControl(`features-${idx}`)

    this.jsonFeatures = this.jsonFeatures.filter(res => {
      return res.id != idx
    })
    this.countControlsFeatures = this.countControlsFeatures.filter(res => {
      return res.id != idx
    })

  }

  checkUnicName() {
    let filterObject = Object.keys(this.formFeatures.controls).filter(res => res.includes('featuresName-'))
    let controlArr: any[] = []
    let resetErorr: any[] = []
    filterObject.forEach(res => {
      if (this.formFeatures.get(res)?.value !== '') controlArr.push(this.formFeatures.get(res)?.value)
    })
    filterObject.forEach(res => {
      if (this.formFeatures.get(res)?.value !== '') resetErorr.push(this.formFeatures.get(res))
    })
    const uniqueNameFeatures = controlArr.every((value: any, index: any, array: any) => {
      if (array.indexOf(value) === array.lastIndexOf(value)) return value;
    });
    if (!uniqueNameFeatures) {
      let uniqueArray = controlArr.filter(function (item, pos) {
        return controlArr.indexOf(item) != pos;
      })
      let controlArr2: any[] = []
      filterObject.forEach(res => {
        if (this.formFeatures.get(res)?.value == uniqueArray[0]) {
          controlArr2.push(this.formFeatures.get(res))
        }
      })
      this.setErrorUnicName(controlArr2, true)
    } else {
      this.setErrorUnicName(resetErorr, false)
    }
  }

  getErrorMessageImageInvalid(id: number): string[] {
    // console.log('getErrorMessageImageInvalid', this.form.get('name_' + (id)))
    if (this.form.get('name_' + (id))?.hasError('checkImage')) {
      // console.log('ERROR IMAGE', this.form.get('name_' + (id))?.hasError('checkImage'), this.form.get('name_' + (id)))
      // console.log(this.errorImages[id-1].error)
      return this.errorImages[id - 1].error
    }

    return this.errorImages[id - 1].error
  }

  getErrorMessageInvalid(id: any) {
    if (this.formFeatures.get('featuresName-' + (id))?.hasError('checkNameValidator')) {
      return `The "${this.formFeatures.get('featuresName-' + (id))?.value}" has already been taken`;
    }
    if (this.formFeatures.get('featuresName-' + (id))?.hasError('pattern')) {
      return `field must not start with a space`;
    }
    return this.formFeatures.get('featuresName-' + (id))?.hasError('required') ? 'required' : '';
  }


}
