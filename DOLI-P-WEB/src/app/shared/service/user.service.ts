import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AppSetting } from '../model/app-setting';
import { UserRegistrationModel, UserModel } from '../model/user.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private readonly _baseService: BaseService) { }

    RegisterUser(userRegistrationModel: UserRegistrationModel) {
        return this._baseService.post(AppSetting.RegisterURL, userRegistrationModel);
    }

    GetAllUser(userId: number) {
        return this._baseService.post(AppSetting.UserGetAllURL + "?userId=" + userId, null);
    }

    AddUpdateUser(userModel: UserModel) {
        return this._baseService.post(AppSetting.UserAddUpdateURL, userModel);
    }

    GetUserDetail(userId: number) {
        return this._baseService.post(AppSetting.UserGetDetailURL + "?userId=" + userId, null);
    }

    DeleteUser(userId: number) {
        return this._baseService.post(AppSetting.UserDeleteURL + "?userId=" + userId, null);
    }

}