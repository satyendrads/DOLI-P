import { Component, OnInit } from '@angular/core';
import { UserRegistrationModel } from 'src/app/shared/model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { UserService } from 'src/app/shared/service/user.service';
import { CommonMessages } from 'src/app/shared/model/common-messages.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerModel: UserRegistrationModel;
  frmGrp: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly _commonService: CommonService,
    private readonly _userService: UserService) {
    this.registerModel = new UserRegistrationModel();
  }

  ngOnInit() {
    this.formGroupInit();
  }

  formGroupInit() {
    this.frmGrp = this.fb.group(
      {
        Name: [null, Validators.required],
        Email: [null, Validators.compose([Validators.required, Validators.email])],
        Password: [null, Validators.required],
        ConfirmPassword: [null, Validators.required]
      },
      {
        validator: this._commonService.checkConfirmedPassword('Password', 'ConfirmPassword')
      }
    );
  }

  submitUserDetail() {
    this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
      this._userService.RegisterUser(this.registerModel).subscribe(
        response => {
          if (response.Result) {
            this._commonService.showSuccess(CommonMessages.RegisterSuccess);
            location.href = '/login';
          }
          else {
            console.log(response.Errors);
          }
        },
        error => {
          console.log('Failed to register new user.');
        }
      );
    }
  }

}
