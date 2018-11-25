import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { OrgService } from '../../org.service';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Org, ShareholderDtls, issuingCountries, roles, validity, documentType } from '../org.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shareholder',
  templateUrl: './shareholder.component.html'
  // styleUrls: ['./shareholder.component.scss']
})
export class ShareholderComponent implements OnInit, OnDestroy, ChildItemComponent {

  @Input() data: any;

  public _changableData = new BehaviorSubject<any>([]);
  productPageType: boolean = true;
  pageType: string;
  countries: issuingCountries[]=[];
  roles: roles[]=[];
  validity;
  idDocType: documentType[]=[];

  ShareholderForm: FormGroup;

  showExpDt: boolean = false;
  rolesBehaviour: BehaviorSubject<any>;
  idDocTypeBehaviour: BehaviorSubject<any>;
  countriesBehaviour: BehaviorSubject<any>;

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
    this.rolesBehaviour = new BehaviorSubject({});
    this.idDocTypeBehaviour = new BehaviorSubject({});
    this.countriesBehaviour = new BehaviorSubject({});
  }

  ngOnInit() {

    this.data = new ShareholderDtls();
    this.ShareholderForm = this.createForms(this.data);

    this.addSubscribers();

    this._orgservice.getMiscOrgData().then((data) => {
      this.rolesBehaviour.next(data.role);
    })

    this._orgservice.getMiscOrgData().then((data) => {
      this.idDocTypeBehaviour.next(data.docType);
    })

    this._orgservice.getMiscOrgData().then((data) => {
      this.countriesBehaviour.next(data.country);
    })

    this._changableData
      .subscribe(shareholders => {
        if (shareholders === false) {
          this.productPageType = false;
          return;
        }
        if (shareholders) {

          this.data = new ShareholderDtls(shareholders);
          this.pageType = 'edit';
        }
        else {

          this.pageType = 'new';
        }
        this.productPageType = true;
        console.log(this.data);
        this.updateValues(this.data);
      });

    // this._orgservice.getMiscOrgData().then((data) => {
    //   this.roles = data.role;
    // })


    this.validity = validity;
  }

  addSubscribers() {

    this.ShareholderForm.controls['roleId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {


        this.roles.filter(element => {
          if (element.id == selectedValue) {

            const orgIndx = this.roles.findIndex(record => record.id === selectedValue);

            let orgnizations = this.roles[orgIndx];
            if (orgnizations) {
              this.updateValues({ 'roleName': orgnizations.name })
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

      this.ShareholderForm.controls['idDocTypeId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {


        this.idDocType.filter(element => {
          if (element.id == selectedValue) {

            const orgIndx = this.idDocType.findIndex(record => record.id === selectedValue);

            let orgnizations = this.idDocType[orgIndx];
            if (orgnizations) {
              this.updateValues({ 'idDocTypeName': orgnizations.name })
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

      this.ShareholderForm.controls['issuingCountryId'].valueChanges
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

    this.rolesBehaviour.subscribe(bnames => {
      for (let j in bnames) {
        this.roles.push(new roles(bnames[j]));
      }
      this.ShareholderForm.controls['roleId'].updateValueAndValidity();
    });

    this.idDocTypeBehaviour.subscribe(bnames => {
      for (let j in bnames) {
        this.idDocType.push(new documentType(bnames[j]));
      }
      this.ShareholderForm.controls['idDocTypeId'].updateValueAndValidity();
    });

    this.countriesBehaviour.subscribe(bnames => {
      for (let j in bnames) {
        this.countries.push(new issuingCountries(bnames[j]));
      }
      this.ShareholderForm.controls['issuingCountryId'].updateValueAndValidity();
    });
  }

  updateValues(obj: any) {

    this.ShareholderForm.patchValue(obj);
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
    let dataToUpdate = this.ShareholderForm.value;

    this._changableData.next(dataToUpdate);

    return this.getValue();
  }

  createForms(shareholdersdtls): FormGroup {
    // console.log(shareholdersdtls);
    return this._formBuilder.group({
      id: [shareholdersdtls.id],
      shName: [shareholdersdtls.shName, Validators.required],
      roleId: [shareholdersdtls.roleId, Validators.required],
      roleName: [shareholdersdtls.roleName, Validators.required],
      perShare: [shareholdersdtls.perShare, Validators.required],
      idDocTypeId: [shareholdersdtls.idDocTypeId, Validators.required],
      idDocTypeName: [shareholdersdtls.idDocTypeName, Validators.required],
      shDocumentNo: [shareholdersdtls.shDocumentNo, Validators.required],
      issuingCountryId: [shareholdersdtls.issuingCountryId, Validators.required],
      issuingCountryName: [shareholdersdtls.issuingCountryName, Validators.required],
      shHasValidity: [false],
      shExpiryDate: [shareholdersdtls.expiryDate]
    }, { validator: this.chkExpiryDateValidator() })

  }

  public chkExpiryDateValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      var checkedValue = group.controls['shHasValidity'].value;
      if (checkedValue) {
        this.showExpDt = true;
        var expiryDateControl = group.controls['shExpiryDate'];
        expiryDateControl.setValidators([Validators.required, Validators.minLength(3)]);
        expiryDateControl.updateValueAndValidity({ emitEvent: false, onlySelf: true });
      } else {
        this.showExpDt = false;
        var expiryDateControl = group.controls['shExpiryDate'];
        expiryDateControl.clearValidators();
        expiryDateControl.updateValueAndValidity({ emitEvent: false, onlySelf: true });
      }
      return
    }
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
