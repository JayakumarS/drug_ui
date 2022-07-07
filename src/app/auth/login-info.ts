export class AuthLoginInfo {
    username: string;
    password: string;
    otpValue:string;
    constructor(username: string, password: string,otpValue: string) {
        this.username = username;
        this.password = password;
        this.otpValue = otpValue;
    }
}
