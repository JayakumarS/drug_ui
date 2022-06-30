export class JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    roles: [];
    success:boolean;
    message:string;
    email:string;
    defaultRoleId: any;
}
