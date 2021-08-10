import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel, LoginResponseModel } from 'src/app/shared/model/login.model';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { CommonMessages } from 'src/app/shared/model/common-messages.model';
import { EnumLoginStatus } from 'src/app/shared/enum/common.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  frmGrp: FormGroup;
  loginModel: LoginModel; 
  isForgotpassword: boolean = false;
  isRegister: boolean = false;

  constructor(private readonly fb: FormBuilder, private readonly _router: Router,
    private readonly _authService: AuthenticationService) {
    this.loginModel = new LoginModel();
  }

  ngOnInit() {
    if (this._authService.IsSessionOut()) {
      this._authService.LogOut();
    }
    else if (this._authService.IsAuthenticated) {
      this._router.navigate(["dashboard"]);
    }
    this.formGroupInit();
  }

  formGroupInit() {
    this.frmGrp = this.fb.group({
      Username: [null, Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.compose([Validators.required])]
    });
  }

  resetLoginForm() {
    this.frmGrp.reset();
  }

  submitLoginDetail() {
    this._authService.IsAuthenticated = false;
    this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
      this._authService.Login(this.loginModel).subscribe(
        response => {
          if (response.Result) {
            var res = <LoginResponseModel>response.Result;
            if (res.LoginStatus == EnumLoginStatus.NotExist) {
              alert("User not exist.");
            }
            else if (res.LoginStatus == EnumLoginStatus.InvalidDetail) {
              alert("Invalid Email or Password.");
            }
            else if (res.LoginStatus == EnumLoginStatus.Inactive) {
              alert("Your account is inactive now. Please contact to administrator.");
            }
            else if (res.LoginStatus == EnumLoginStatus.Success) {
              this._authService.IsAuthenticated = true;
              this._authService.LoginUserDetail = res.UserDetail;
              this._authService.UserId = res.UserDetail.UserId;

              localStorage.setItem("Token", "DiscoveryPhase " + res.UserDetail.Token);
              localStorage.setItem('UserId', this._authService.UserId.toString());
              localStorage.setItem("IsAuthenticated", String(this._authService.IsAuthenticated));
              localStorage.setItem("UserDetail", JSON.stringify(this._authService.LoginUserDetail));

              this._router.navigate(["dashboard"]);
            }
          }
          else {
            console.log(response.Errors);
          }
        },
        error => {
          console.log('Failed to login user.');
        }
      );
    }
  }

}
