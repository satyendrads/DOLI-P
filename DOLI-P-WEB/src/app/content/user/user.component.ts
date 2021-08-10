import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';
import { UserService } from 'src/app/shared/service/user.service';
import { UserModel } from 'src/app/shared/model/user.model';
import { ConfirmationPopupModel } from 'src/app/shared/model/confirmation-popup.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  loginUserId: number = 0;
  userModelList: UserModel[] = [];
  confirmModel: ConfirmationPopupModel = new ConfirmationPopupModel();

  constructor(private readonly _commonService: CommonService, private readonly _userService: UserService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.GetAllUser(this.loginUserId).subscribe(
      response => {
        if (response.Result) {
          this.userModelList = <UserModel[]>response.Result;
          if (this.userModelList.length > 10) {
            this._commonService.setDataTable('tblUsers');
          }
        }
        else {
          console.log(response.Errors);
        }
      },
      error => {
        console.log('Failed to get users list.');
      }
    );
  }

  confirmUserDelete(userId: number) {
    this.confirmModel.RecordId = userId;
    this.confirmModel.Message = "Do you want to delete selected record.";
    this.confirmModel.IsShow = true;
  }

  checkConfirmationResponse(isAccept: boolean) {
    if (isAccept) {
      this.deleteUser(this.confirmModel.RecordId);
    }
    this.confirmModel = new ConfirmationPopupModel();
  }

  deleteUser(userId: number) {
    this._userService.DeleteUser(userId).subscribe(response => {
      if (response.Result) {
        this._commonService.showSuccess('User deleted successfully.');
        this.getAllUsers();
      }
      else {
        console.log(response.Errors);
      }
    },
      error => {
        console.log("Failed to delete user.");
      }
    );
  }

}
