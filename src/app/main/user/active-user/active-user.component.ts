
import { ChildListComponent } from '@custom/components/childlist/childlist.component';
import { AbstractControl, FormControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from "../user.service";
import { Response, Http, Headers } from '@angular/http';
import { config, statusCode } from "config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter, Inject, Injectable } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable,Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import 'rxjs/add/observable/of';

// import { ActionType, Actions } from '../../../../../config/tablelist.config';
// import { TableDataProviderService } from '../../tablelist.service';
import { ActiveUser} from "../userform/userForm.model";

const baseUrl: string = config.url + ":" + config.port;
@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.scss'],
  animations: fuseAnimations
})
export class ActiveUserComponent implements OnInit {
  user: ActiveUser = new ActiveUser();
  ActiveUserForm:FormGroup;
  pageType: string;
  username
  constructor(private _formBuilder: FormBuilder,public _router: ActivatedRoute,public _matDialog: MatDialog, public _userService: UserService,private router: Router) { 
    this.username=this._router.snapshot.params.username;
    console.log("userName is",this.username)
  }

  ngOnInit() {


    this.user = new ActiveUser();

    this.ActiveUserForm = this.createControl(this.user);
  }
//validation
validateform() {
  if (this.ActiveUserForm.invalid) {
    return true;
  } else {
    return false;
  }
}
createControl(userData: ActiveUser): FormGroup {

  this.ActiveUserForm = this._formBuilder.group({
    username: [userData.username, Validators.required],
    status: [userData.status],
    agree: [userData.agree, Validators.required]
  });
  return this.ActiveUserForm;
}

/**
     * @author: Madhu
     * @argument:none
     * @description:Form Submit
     */
    addUserData() {
     let rejectReason;
      const dialogRef = this._matDialog.open(DialogOverviewExampleDialog, {
        width: '300px',
        data: { reason: rejectReason }
    });
    
    // dialogRef.componentInstance.confrimMessage = 'Are you sure you have seen the details? Do you want to continue ?  '+actionObject.message+'?';
    dialogRef.componentInstance.confrimMessage = 'Are you sure you have seen the details? Do you want to accept ?';

    dialogRef.afterClosed().subscribe(result => {
        rejectReason = result;

        if(rejectReason===false){
            return;
        }
      
      let userdtl = this.getPOObject();
      userdtl.status = statusCode.Activated;
      console.log(JSON.stringify(userdtl));
      if (this.pageType === 'activated') {
        userdtl.status = statusCode.Activated; 
      }
    
      this.sendUOToServer(userdtl);
    });
    }
  
    sendUOToServer(userdtl: ActiveUser) {
  
        this._userService.addActivateUserData(userdtl).then((data) => {
          this.router.navigate(['/notification',data=data]);
        });
      }
  
    getPOObject() {
      let userInfo = this.ActiveUserForm.getRawValue();
      userInfo['username']=this.username;
      let userdtl = new ActiveUser(userInfo);
      console.log("user data is", JSON.stringify(userdtl));
  
      return userdtl;
    }
    cancel(){
      this.router.navigate(['/activeUsers']);
    }

   
  }
  @Component({
    selector: 'dialog-result-example-dialog',
    templateUrl: '../../../../@custom/components/tablelist/reasondialog.html',
})
export class DialogOverviewExampleDialog {

    
    constructor(
    
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){}

    public confrimMessage: string;
}



export interface DialogData {
    reason: string;
    status: boolean;
}

 
