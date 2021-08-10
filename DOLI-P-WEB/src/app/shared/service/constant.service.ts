import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../model/app-setting';
import { ConstantModel } from '../model/constant.model';

@Injectable({
    providedIn: 'root'
})

export class ConstantService {

    constructor(private readonly _baseService: BaseService) { }

    GetAllConstant() {
        return this._baseService.post(AppSetting.ConstantGetAllURL, null);
    }

    UpdateConstant(constantModel: ConstantModel) {
        return this._baseService.post(AppSetting.ConstantUpdateURL, constantModel);
    }

}