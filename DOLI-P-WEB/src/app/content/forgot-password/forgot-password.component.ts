import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { ForgotPasswordModel } from 'src/app/shared/model/forgot-password.model';
import { CommonMessages } from 'src/app/shared/model/common-messages.model';
import { EnumForgotPassStatus } from 'src/app/shared/enum/common.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  frmGrp: FormGroup;
  forgotPassModel: ForgotPasswordModel;

  constructor(private readonly fb: FormBuilder, private router: Router,
    private readonly _authService: AuthenticationService) {
    this.forgotPassModel = new ForgotPasswordModel();
  }

  ngOnInit() {
    this.formGroupInit();
  }

  formGroupInit() {
    this.frmGrp = this.fb.group({
      Email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  submitForgotPassDetail() {
    this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
      this._authService.ForgotPassword(this.forgotPassModel.Email).subscribe(
        response => {
          if (response.Result == EnumForgotPassStatus.NotExist) {
            alert("Email not exist.");
          }
          else if (response.Result == EnumForgotPassStatus.Inactive) {
            alert("Your account is inactive now. Please contact to administrator.");
          }
          else if (response.Result == EnumForgotPassStatus.Success) {
            alert("Please check your mail inbox. We have sent a reset password link.");
            location.href = '/login';
          }
          else {
            console.log(response.Errors);
          }
        },
        error => {
          console.log('Failed to forgot/reset password.');
        }
      );
    }
  }

}
