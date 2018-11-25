import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { OrgService } from '../../org.service';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Org, CompanyDtls, registrationType, issuingOffices, issuingCountries, validity } from '../org.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
  // styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy, ChildItemComponent {

  @Input() data: any;

  productPageType: boolean = true;
  CompanyForm: FormGroup;
  pageType: string;

  typeofReg: registrationType[] = [];
  offices: issuingOffices[] = [];
  countries: issuingCountries[] = [];
  validity;

  showExpDt: boolean = false;
  countriesBehaviour: BehaviorSubject<any>;
  officesBehaviour: BehaviorSubject<any>;
  typeofRegBehaviour: BehaviorSubject<any>;

  public _changableData = new BehaviorSubject<any>([]);

  // Private
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {EcommerceProductService} _productService
   * @param {FormBuilder} _formBuilder
   * @param {Location} _location
   * @param {MatSnackBar} _matSnackBar
   */
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _orgservice: OrgService
  ) {
    this._unsubscribeAll = new Subject();
    this._changableData = new BehaviorSubject<any>(this.data);
    this.countriesBehaviour = new BehaviorSubject({});
    this.officesBehaviour = new BehaviorSubject({});
    this.typeofRegBehaviour = new BehaviorSubject({});
  }

  ngOnInit() {

    this.data = new CompanyDtls();
    this.CompanyForm = this.createForms(this.data);

    this.addSubscribers();

    this._orgservice.getMiscOrgData().then((data) => {
      this.countriesBehaviour.next(data.country);
    })

    this._orgservice.getMiscOrgData().then((data) => {
      this.officesBehaviour.next(data.issuingOffice);
    })

    this._orgservice.getMiscOrgData().then((data) => {
      this.typeofRegBehaviour.next(data.registrationType);
    })

    this._changableData
      .subscribe(company => {
        if (company === false) {
          this.productPageType = false;
          return;
        }
        if (company) {

          this.data = new CompanyDtls(company);
          this.pageType = 'edit';
        }
        else {

          this.pageType = 'new';
        }
        this.productPageType = true;
        console.log(this.data);
        this.updateValues(this.data);
      });

    this.validity = validity;
  }

  addSubscribers() {


      this.CompanyForm.controls['issuingCountryId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {


        this.countries.filter(element => {
          if (element.id == selectedValue) {

            const orgIndx = this.countries.findIndex(record => record.id === selectedValue);

            let orgnizations = this.countries[orgIndx];
            if (orgnizations) {
              this.updateValues({ 'issuingCountryName': orgnizations.name })
            }

            // this.addresses=element.address

            // this.selectMailingAddress();
            // if(this.mailingAddress){
            //     this.updateValues({"supplierAddrsId":this.mailingAddress.id,"supplierAddrs":this.createAddress(this.mailingAddress)});
            // }

            // if(this.pageType==='edit'){
            //     this.updateValues({"billingAddrsId":this.mailingAddress.id});
            // }

          }
        });
      }
      )

      this.CompanyForm.controls['issuingOfficeId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {


        this.offices.filter(element => {
          if (element.id == selectedValue) {

            const orgIndx = this.offices.findIndex(record => record.id === selectedValue);

            let orgnizations = this.offices[orgIndx];
            if (orgnizations) {
              this.updateValues({ 'issuingOfficeName': orgnizations.name })
            }

            // this.addresses=element.address

            // this.selectMailingAddress();
            // if(this.mailingAddress){
            //     this.updateValues({"supplierAddrsId":this.mailingAddress.id,"supplierAddrs":this.createAddress(this.mailingAddress)});
            // }

            // if(this.pageType==='edit'){
            //     this.updateValues({"billingAddrsId":this.mailingAddress.id});
            // }

          }
        });
      }
      )


      this.CompanyForm.controls['registrationTypeId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {


        this.typeofReg.filter(element => {
          if (element.id == selectedValue) {

            const orgIndx = this.typeofReg.findIndex(record => record.id === selectedValue);

            let orgnizations = this.typeofReg[orgIndx];
            if (orgnizations) {
              this.updateValues({ 'registrationTypeName': orgnizations.name })
            }

            // this.addresses=element.address

            // this.selectMailingAddress();
            // if(this.mailingAddress){
            //     this.updateValues({"supplierAddrsId":this.mailingAddress.id,"supplierAddrs":this.createAddress(this.mailingAddress)});
            // }

            // if(this.pageType==='edit'){
            //     this.updateValues({"billingAddrsId":this.mailingAddress.id});
            // }

          }
        });
      }
      )

    this.countriesBehaviour.subscribe(bnames => {
      for (let j in bnames) {
        this.countries.push(new issuingCountries(bnames[j]));
      }
      this.CompanyForm.controls['issuingCountryId'].updateValueAndValidity();
    });


    this.officesBehaviour.subscribe(bnames => {
      for (let j in bnames) {
        this.offices.push(new issuingOffices(bnames[j]));
      }
      this.CompanyForm.controls['issuingOfficeId'].updateValueAndValidity();
    });

    this.typeofRegBehaviour.subscribe(bnames => {
      for (let j in bnames) {
        this.typeofReg.push(new registrationType(bnames[j]));
      }
      this.CompanyForm.controls['registrationTypeId'].updateValueAndValidity();
    });
  }

  updateValues(obj: any) {

    this.CompanyForm.patchValue(obj);
  }

  addNewClicked() {

    this._changableData.next(null);
  }

  setData(data) {
    this._changableData.next(data);
  }

  getValue() {
    return this._changableData.getValue()
  }

  saveData() {
    let dataToUpdate = this.CompanyForm.value;

    this._changableData.next(dataToUpdate);

    return this.getValue();
  }

  createForms(companydtls): FormGroup {
    console.log(companydtls);
    return this._formBuilder.group({
      id: [companydtls.id],
      registrationTypeId: [companydtls.registrationTypeId, Validators.required],
      registrationTypeName: [companydtls.registrationTypeName, Validators.required],
      regNo: [companydtls.regNo, Validators.required],
      regDate: [companydtls.regDate, Validators.required],
      issuingCountryId: [companydtls.issuingCountryId, Validators.required],
      issuingCountryName: [companydtls.issuingCountryName, Validators.required],
      issuingOfficeId: [companydtls.issuingOfficeId, Validators.required],
      issuingOfficeName: [companydtls.issuingOfficeName, Validators.required],
      hasValidity: [false],
      expiryDate: [companydtls.expiryDate]
    }, { validator: this.chkExpiryDateValidator() })

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  public chkExpiryDateValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      var checkedValue = group.controls['hasValidity'].value;
      console.log(checkedValue);
      if (checkedValue) {
        this.showExpDt = true;
        var expiryDateControl = group.controls['expiryDate'];
        expiryDateControl.setValidators([Validators.required, Validators.minLength(3)]);
        expiryDateControl.updateValueAndValidity({ emitEvent: false, onlySelf: true });
      } else {
        this.showExpDt = false;
        var expiryDateControl = group.controls['expiryDate'];
        expiryDateControl.clearValidators();
        expiryDateControl.updateValueAndValidity({ emitEvent: false, onlySelf: true });
      }
      return
    }
  }


}
























