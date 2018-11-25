import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AbstractControl, FormControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from "../user.service";
import { Response, Http, Headers } from '@angular/http';
import { config, statusCode } from "config";
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Location } from '@angular/common';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { userData, UserRole, UserType } from "../userform/userForm.model";
const baseUrl: string = config.url + ":" + config.port;

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
  animations: fuseAnimations
})
export class UserformComponent implements OnInit {
  user: userData = new userData();

  userRole: UserRole[] = [];
  rolesBehaviour: BehaviorSubject<any>;
  userType: UserType[] = [];
  userTypeBehaviour: BehaviorSubject<any>;

  UserForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageType: string;

  orgId: string;
  // Private
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    public _userService: UserService,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router) {

    this.orgId = this.routerData.snapshot.params.orgId;

    // Set the private defaults
    this.rolesBehaviour = new BehaviorSubject([]);
    this.userTypeBehaviour = new BehaviorSubject([]);
    this._unsubscribeAll = new Subject();
  }
  ngOnInit() {

    this.user = new userData();
    
    this.UserForm = this.createControl(this.user);
    this.addSubscribers();

    this._userService.getEnumData().then((data) => {

      this.userTypeBehaviour.next(data.types);
      this.rolesBehaviour.next(data.userRole);
    });

    this._userService.onDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(tableData => {

        console.log("tableData",tableData);
        if (tableData) {

          console.log("edit");
          this.user = new userData(tableData);
          this.orgId=this.user.orgId;
          this.pageType = 'edit';

        }
        else {
          console.log("new");
          this.pageType = 'new';
          this.user.orgId=this.orgId;
        }
        this.updateValues(this.user);

      });


  }

  addSubscribers() {

    this.rolesBehaviour.subscribe(snames => {
      for (let j in snames) {
        this.userRole.push(new UserRole(snames[j]));
      }
      this.UserForm.controls['roleId'].updateValueAndValidity();
    });

    this.userTypeBehaviour.subscribe(snames => {
      for (let j in snames) {
        this.userType.push(new UserType(snames[j]));
      }
      this.UserForm.controls['userTypeId'].updateValueAndValidity();
    });

    this.UserForm.controls['roleId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {

        this.userRole.filter(element => {
          if (element.id == selectedValue) {

            const userRoleIndx = this.userRole.findIndex(record => record.id === selectedValue);

            let userRole = this.userRole[userRoleIndx];
            if (userRole) {
              this.updateValues({ 'roleName': userRole.name })
            }

          }
        });
      });

    this.UserForm.controls['userTypeId'].valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((selectedValue) => {

        this.userType.filter(element => {
          if (element.id == selectedValue) {

            const orgIndx = this.userType.findIndex(record => record.id === selectedValue);

            let userType = this.userType[orgIndx];
            if (userType) {
              this.updateValues({ 'userTypeName': userType.name })
            }

          }
        });
      });
  }
  //Update Values
  updateValues(obj: any) {

    this.UserForm.patchValue(obj);
  }
  createControl(userData: userData): FormGroup {

    this.UserForm = this._formBuilder.group({
      firstName: [userData.firstName, Validators.required],
      lastName: [userData.lastName, Validators.required],
      designation: [userData.designation, Validators.required],
      roleId: [userData.roleId, Validators.required],
      roleName: [userData.roleName, Validators.required],
      contactNo: [userData.contactNo, Validators.required],
      email: [userData.email, Validators.required],
      userTypeId: [userData.userTypeId, Validators.required],
      userTypeName: [userData.userTypeName],
      orgId: [userData.orgId,Validators.required],
      orgName: [userData.orgName],
      id: [userData.id],
      status: [userData.status]
    });
    return this.UserForm;
  }

  openSnackBar(data) {
    this._matSnackBar.open(data, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // addMaker() {
  //   var data = {};
  //   data['appName'] = config.appName;
  //   data['role'] = "maker";
  //   data['ordId'] = "org1540356948521"
  //   console.log("data", data);
  //   this.http.post("http://192.168.5.121" + ":" + "10011" + "/userRegistration", data)
  //     .map(
  //       (response) => response.json()
  //     )
  //     .catch((err) => {
  //       console.log("Failed to create user => ", err);
  //       this.openSnackBar("Could not create user");
  //       // this.notification.Info(err['_body']);
  //       return Observable.throw(err)
  //     })
  //     .subscribe((res: Response) => {
  //       console.log("User created Successfully => => ", res);
  //       this.openSnackBar("User created Successfully!!");
  //       this.router.navigate(["/users"]);
  //     })
  // };


  // addChecker() {
  //   var data = {};
  //   data['appName'] = config.appName;
  //   data['role'] = "checker";
  //   data['ordId'] = "org1540356948521"
  //   console.log("data", data);
  //   this.http.post("http://192.168.5.121" + ":" + "10011" + "/userRegistration", data)
  //     .map(
  //       (response) => response.json()
  //     )
  //     .catch((err) => {
  //       console.log("Failed to create user => ", err);
  //       this.openSnackBar("Could not create user");
  //       // this.notification.Info(err['_body']);
  //       return Observable.throw(err)
  //     })
  //     .subscribe((res: Response) => {
  //       console.log("User created Successfully => => ", res);
  //       this.openSnackBar("User created Successfully!!");
  //       this.router.navigate(["/users"]); validate() {
  //     })
  // }

  //validation
  validateform() {
    if (this.UserForm.invalid) {
      return true;
    } else {
      return false;
    }
  }
  /**
     * @author: Madhu
     * @argument:none
     * @description:Form Submit
     */
  addUserData() {

    let userdtl = this.getPOObject();

    userdtl.status = statusCode.New;
    userdtl.orgId = this.orgId;
    console.log(JSON.stringify(userdtl));
    if (this.pageType === 'new' || this.pageType === 'draft') {
      userdtl.status = statusCode.New;
    }
    this.sendUOToServer(userdtl);
  }
  /**
      * @author: Madhu
      * @argument:none
      * @description:Form Save
      */
  saveUserData() {


    // userdtl.status = 'New'
    // console.log(JSON.stringify(userdtl));
    // if (this.pageType === 'new' || this.pageType === 'draft') {
    //   userdtl.status = 'New';
    // }

    let userdtl = this.getPOObject();
    userdtl.status = 'Draft';
    this.sendUOToServer(userdtl);
  }



  sendUOToServer(userdtl: userData) {

    this.orgId=userdtl.orgId;
    console.log("orgId:",userdtl);

    if (userdtl.id && userdtl.id !== "") {
      this._userService.updateUserData(userdtl).then((resp) => {
        this.router.navigate(['/users', { orgId: this.orgId }]);
      });

    } else {
      this._userService.addUserData(userdtl).then((resp) => {
        if(resp.statusCode && resp.statusCode===409){
          this.openSnackBar(resp.message);
        }else{
          this.router.navigate(['/users', { orgId: this.orgId }]);
        }
       
      });
    }


  }

  routeBack() {
    this.router.navigate(['/users', { orgId: this.orgId }]);
  }

  getPOObject() {
    let userInfo = this.UserForm.getRawValue();
    let userdtl = new userData(userInfo);
    console.log("user data is", JSON.stringify(userdtl));

    return userdtl;
  }
}
