import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConstantModel } from 'src/app/shared/model/constant.model';
import { CommonService } from 'src/app/shared/service/common.service';
import { Router } from '@angular/router';
import { ConstantService } from 'src/app/shared/service/constant.service';

@Component({
  selector: 'app-constants',
  templateUrl: './constants.component.html',
  styleUrls: ['./constants.component.css']
})
export class ConstantsComponent implements OnInit {
  constantModel: ConstantModel = new ConstantModel();
  frmGrp: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly _commonService: CommonService,
    private readonly _router: Router, private readonly _constantService: ConstantService) {
  }

  ngOnInit() {
      this.getAllConstants();
      this.formGroupInit();
  }

  formGroupInit() {
    this.frmGrp = this.fb.group({
      CashGrowthRate: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)])],
      Inflation: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)])],
      MortalityDate: [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      RealEstateGrowthRate: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)])],
      SupportChildUntil: [null, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])]
    });
  }

  getAllConstants() {
    this._constantService.GetAllConstant().subscribe(
      response => {
        if (response.Result) {
          this.constantModel = <ConstantModel>response.Result;
          console.log('constantModel');
          console.log(this.constantModel);
        }
        else {
          console.log(response.Errors);
        }
      },
      error => {
        console.log('Failed to get constants.');
      }
    );
  }

  submitConstants() {
    this.frmGrp.markAllAsTouched();
    if (this.frmGrp.valid) {
      this._constantService.UpdateConstant(this.constantModel).subscribe(
        response => {
          if (response.Result) {
            this._commonService.showSuccess('Constants approved successfully.');
            this._router.navigate(['dashboard']);
          }
          else {
            console.log(response.Errors);
          }
        },
        error => {
          console.log('Error in overdraft admin verification.');
        }
      );
    }
  }

}
