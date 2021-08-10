export class UserRegistrationModel {
    UserId: number;
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    IsActive: boolean = true;
    IsDelete: boolean = false;
    CreatedDate: Date;
    ModifiedDate: Date | null;
} 

export class LoginUserDetailModel {
    UserId: number;
    Name: string;
    Email: string;
} 

export class UserModel {
    UserId: number;
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Token: string;
    IsActive: boolean = true;
    IsDelete: boolean = false;
    CreatedDate: Date;
    ModifiedDate: Date | null;
} 