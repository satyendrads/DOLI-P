import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { UserService } from 'src/app/shared/service/user.service';
import { CommonMessages } from 'src/app/shared/model/common-messages.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})

export class AddUpdateUserComponent implements OnInit {
  userModel: UserModel;
  frmGrp: FormGroup;
  pageHeading: string;

  constructor(private _route: ActivatedRoute, private readonly fb: FormBuilder,
    private readonly _commonService: CommonService, private readonly _userService: UserService) {
    this.userModel = new UserModel();
    if (this._route.snapshot.params.id != undefined) {
      this.userModel.UserId = this._route.snapshot.params.id;
      this.pageHeading = (this.userModel.UserId == 0 ? 'Add' : 'Update') + ' User';
    }
  }

  ngOnInit() {
    this.formGroupInit();
    if (this.userModel.UserId > 0) {
      this.getUserDetail();
    }
  }

  formGroupInit() {
    this.frmGrp = this.fb.group(
      {
        Name: [null, Validators.required],
        Email: [null, Validators.compose([Validators.required, Validators.email])]
      }
    );
  }

  getUserDetail() {
    this._userService.GetUserDetail(this.userModel.UserId).subscribe(
      response => {
        if (response.Result) {
          this.userModel = <UserModel>response.Result;
        }
        else {
          console.log(response.Errors);
        }
      },
      error => {
        console.log('Failed to get user detail.');
      }
    );
  }

  submitUserDetail() {
    this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
      this._userService.AddUpdateUser(this.userModel).subscribe(
        response => {
          if (response.Result) {
            this._commonService.showSuccess(CommonMessages.RegisterSuccess);
            location.href = '/user';
          }
          else {
            console.log(response.Errors);
          }
        },
        error => {
          console.log('Failed to add/update user.');
        }
      );
    }
  }

}
