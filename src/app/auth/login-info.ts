export class AuthLoginInfo {
    username: string;
    password: string;
    otpValue:string;
    userNameEmailId:string;

    constructor(username: string, password: string,otpValue: string,userNameEmailId:string) {
        this.username = username;
        this.password = password;
        this.otpValue = otpValue;
        this.userNameEmailId=userNameEmailId;
    }
}
