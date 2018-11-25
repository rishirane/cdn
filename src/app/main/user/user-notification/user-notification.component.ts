import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { ActiveUser} from "../userform/userForm.model";
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnInit {
  usersList:ActiveUser[];
  activateData;
  tinyUrl
  constructor(public _userService: UserService,public _router: ActivatedRoute) {
    this.tinyUrl=this._router.snapshot.params.tinyUrl;
    console.log("userName is",this.tinyUrl)
   }

  ngOnInit() {
    this.activateData = new ActiveUser();
 
  }

}
