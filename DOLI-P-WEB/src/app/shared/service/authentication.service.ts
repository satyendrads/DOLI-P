import { Injectable } from '@angular/core';
import { AppSetting } from '../model/app-setting';
import { BaseService } from './base.service';
import { LoginModel } from '../model/login.model';
import { ResetPasswordModel } from '../model/forgot-password.model';
import { LoginUserDetailModel } from '../model/user.model';
import { Router } from '@angular/router';
import { SessionTimeOut } from '../enum/fixed-values.enum';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    LoginUserDetail: LoginUserDetailModel;
    public IsAuthenticated: boolean = false;
    public UserId: number = null;

    constructor(private readonly _baseService: BaseService, private readonly _router: Router) {
        this.IsAuthenticated = (localStorage.getItem("IsAuthenticated") != undefined)
            ? JSON.parse(localStorage.getItem("IsAuthenticated")) : false;
        if (this.IsAuthenticated == false || this.IsSessionOut()) {
            this._router.navigate(["login"]);
        } else {
            this.IsAuthenticated = true;
            this.LoginUserDetail = this.GetLoginUserDetail();
            this.UserId = this.LoginUserDetail.UserId;
        }
    }

    Login(loginModel: LoginModel) {
        this.removeLocalStorage();
        return this._baseService.post(AppSetting.LoginURL, loginModel);
    }

    ForgotPassword(email: string) {
        return this._baseService.post(AppSetting.ForgotPasswordURL + "?email=" + email, null);
    }

    ResetPassword(resetPassModel: ResetPasswordModel) {
        return this._baseService.post(AppSetting.ResetPasswordURL, resetPassModel);
    }


    GetLoginUserDetail(): LoginUserDetailModel {
        if (localStorage.getItem("UserDetail")) {
            const userDetails = <LoginUserDetailModel>(JSON.parse(localStorage.getItem("UserDetail")));
            return userDetails;
        } else {
            this._router.navigate(["login"]);
        }
        return null;
    }

    LogOut() {
        this.removeLocalStorage();
        localStorage.removeItem("SessionTime");
        this._router.navigate(["login"]);
    }

    removeLocalStorage() {
        this.LoginUserDetail = null;
        this.IsAuthenticated = false;
        localStorage.removeItem("Token");
        localStorage.removeItem("UserId");
        localStorage.removeItem("IsAuthenticated");
        localStorage.removeItem("UserDetail");
    }

    IsUserAuthenticated(): boolean {
        if (localStorage.getItem("IsAuthenticated")) {
            if (localStorage.getItem("IsAuthenticated").toLowerCase() == "true") {
                return true;
            }
        }
        return false;
    }

    IsSessionOut() {
        if (!localStorage.getItem("SessionTime")) {
            localStorage.setItem("SessionTime", new Date().toString());
            return true;
        } else {
            const timeDiff = Math.round((new Date().getTime() - new Date(localStorage.getItem("SessionTime")).getTime()) / 60000); //in minute
            if (!(timeDiff < SessionTimeOut.TimeInMinute)) {
                return true;
            } else {
                return false;
            }
        }
    }

}
