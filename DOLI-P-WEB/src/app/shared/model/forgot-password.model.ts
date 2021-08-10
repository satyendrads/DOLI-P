export class ForgotPasswordModel {
    Email: string;
}

export class ResetPasswordModel {
    Email: string;
    EncEmail: string;
    Password: string;
    ConfirmPassword: string;
}