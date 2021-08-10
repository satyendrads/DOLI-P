import { UserModel } from './user.model';

export class LoginModel {
    Username: string | null;
    Password: string | null;
    UserType: string | null;
}

export class LoginResponseModel {
    LoginStatus: string;
    UserDetail: UserModel;
}