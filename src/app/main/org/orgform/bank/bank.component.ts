import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ChildItemComponent } from '@custom/components/childlist/childitem.component';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { OrgService } from '../../org.service';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Org, BankDtls, branchList, roles, validity, bankList } from '../org.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html'
  // styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit, OnDestroy, ChildItemComponent {

  @Input() data: any;

  public _changableData = new BehaviorSubject<any>([]);
  productPageType: boolean = true;
  pageType: string;
  bankNames: bankList[] = [];
  bankBranches: branchList[] = [];
  bankNamesBehaviour: BehaviorSubject<any>;
  bankBranchesBehaviour: BehaviorSubject<any>;

  BankForm: FormGroup;

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
    this.bankNamesBehaviour = new BehaviorSubject({});
    this.bankBranchesBehaviour = new BehaviorSubject({});

  }

  ngOnInit() {


    this.data = new BankDtls();
    this.BankForm = this.createForms(this.data);

    this.addSubscribers();

    this._orgservice.getMiscOrgData().then((data) => {
      this.bankNamesBehaviour.next(data.banks);
    })

    this._orgservice.getMiscOrgData().then((data) => {
      this.bankBranchesBehaviour.next(data.branches);
    })

    this._changableData
      .subscribe(banks => {
        if (banks === false) {
          this.productPageType = false;
          return;
        }
       
        if (banks) {

          this.data = new BankDtls(banks);
          this.pageType = 'edit';
        }
        else {

          this.pageType = 'new';

        }
        this.productPageType = true;
        console.log(this.data);
        this.updateValues(this.data);
      });

  }

  addSubscribers() {

    this.BankForm.controls['bankNameId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {

        this.bankNames.filter(element => {
          if (element.id == selectedValue) {

            const orgIndx = this.bankNames.findIndex(record => record.id === selectedValue);

            let orgnizations = this.bankNames[orgIndx];
            if (orgnizations) {
              this.updateValues({ 'bankName': orgnizations.name })
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

    this.BankForm.controls['bankBranchId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {

        this.bankBranches.filter(element => {
          if (element.id == selectedValue) {

            const orgIndx = this.bankBranches.findIndex(record => record.id === selectedValue);

            let orgnizations = this.bankBranches[orgIndx];
            if (orgnizations) {
              this.updateValues({ 'bankBranchName': orgnizations.name })
            }

            // this.addresses = element.address

            // this.selectMailingAddress();
            // if (this.mailingAddress) {
            //   this.updateValues({ "supplierAddrsId": this.mailingAddress.id, "supplierAddrs": this.createAddress(this.mailingAddress) });
            // }

            // if (this.pageType === 'edit') {
            //   this.updateValues({ "billingAddrsId": this.mailingAddress.id });
            // }

          }
        });
      }
      )

    this.bankNamesBehaviour.subscribe(bnames => {
      for (let j in bnames) {
        this.bankNames.push(new bankList(bnames[j]));
      }
      this.BankForm.controls['bankNameId'].updateValueAndValidity();
    });

    this.bankBranchesBehaviour.subscribe(snames => {
      for (let j in snames) {
        this.bankBranches.push(new branchList(snames[j]));
      }
      this.BankForm.controls['bankBranchId'].updateValueAndValidity();
    });
  }
  updateValues(obj: any) {

    this.BankForm.patchValue(obj);
  }

  addNewClicked() {

    this._changableData.next(null);
  }

  setData(data) {
    this._changableData.next(data);
  }

  getValue() {
    console.log("value:", this._changableData.getValue());

    return this._changableData.getValue()
  }

  // getValue() {

  //   console.log("value:", this._changableData.getValue());

  //   return this._changableData.getValue()
  // }

  saveData() {
    let dataToUpdate = this.BankForm.value;

    this._changableData.next(dataToUpdate);

    return this.getValue();
  }


  createForms(bankdtls): FormGroup {
    // console.log(bankdtls);
    return this._formBuilder.group({
      id: [bankdtls.id],
      accountTitle: [bankdtls.accountTitle, Validators.required],
      accountNumber: [bankdtls.accountNumber, Validators.required],
      bankName: [bankdtls.bankName, Validators.required],
      bankNameId: [bankdtls.bankNameId, Validators.required],
      bankBranchName: [bankdtls.bankBranchName, Validators.required],
      bankBranchId: [bankdtls.bankBranchId, Validators.required]
    })

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
