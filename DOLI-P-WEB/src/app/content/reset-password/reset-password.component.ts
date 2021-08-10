import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { CommonMessages } from 'src/app/shared/model/common-messages.model';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordModel } from 'src/app/shared/model/forgot-password.model';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  frmGrp: FormGroup;
  resetPassModel: ResetPasswordModel;

  constructor(private _route: ActivatedRoute, private readonly fb: FormBuilder,
    private readonly _commonService: CommonService, private readonly _authService: AuthenticationService) {
      debugger;
    this.resetPassModel = new ResetPasswordModel();
    if (this._route.snapshot.params.id != undefined) {
      this.resetPassModel.EncEmail = this._route.snapshot.params.id;
    }
  }

  ngOnInit() {
    if (this.resetPassModel.EncEmail != undefined)
      this.formGroupInit();
    else
      location.href = '/login';
  }

  formGroupInit() {
    this.frmGrp = this.fb.group(
      {
        Password: [null, Validators.required],
        ConfirmPassword: [null, Validators.required]
      },
      {
        validator: this._commonService.checkConfirmedPassword('Password', 'ConfirmPassword')
      }
    );
  }

  resetPassword() {
    this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
      this._authService.ResetPassword(this.resetPassModel).subscribe(
        response => {
          if (response.Result) {
            alert(CommonMessages.PasswordResetSuccess);
            //this._commonService.showSuccess(CommonMessages.PasswordResetSuccess);
            location.href = '/login';
          }
          else {
            console.log(response.Errors);
          }
        },
        error => {
          console.log('Failed to reset password.');
        }
      );
    }
  }

}