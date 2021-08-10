import { environment } from './../../../environments/environment';

export class AppSetting {

  public static ApiBaseUrl = environment.ApiBase;

  public static LoginURL: string = AppSetting.ApiBaseUrl + 'api/Account/Login';
  public static RegisterURL: string = AppSetting.ApiBaseUrl + 'api/Account/Register';
  public static ForgotPasswordURL: string = AppSetting.ApiBaseUrl + 'api/Account/ForgotPassword';
  public static ResetPasswordURL: string = AppSetting.ApiBaseUrl + 'api/Account/ResetPassword';

  //#region User
  public static UserGetAllURL: string = AppSetting.ApiBaseUrl + 'api/Account/GetAllUsers';
  public static UserGetDetailURL: string = AppSetting.ApiBaseUrl + 'api/Account/GetUserDetail';
  public static UserAddUpdateURL: string = AppSetting.ApiBaseUrl + 'api/Account/AddUpdateUser';
  public static UserDeleteURL: string = AppSetting.ApiBaseUrl + 'api/Account/DeleteUser';
  //#endregion

  //#region Constant
  public static ConstantGetAllURL: string = AppSetting.ApiBaseUrl + 'api/Constant/GetAllConstant';
  public static ConstantUpdateURL: string = AppSetting.ApiBaseUrl + 'api/Constant/UpdateConstant';
  //#endregion

}

