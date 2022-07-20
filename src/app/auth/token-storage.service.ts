import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const AUTHUSERID_KEY = 'AuthUserId';
const AUTHDEFAULTROLEID_KEY = 'AuthDefaultRoleId';
const AUTHDEFAULTROLE_KEY = 'AuthDefaultRole';
const AUTHCUSTOMERCOMPANYCODE_KEY = 'AuthCompanyCode';
const AUTHIMGURL_KEY = 'AuthImgUrl';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(USERNAME_KEY);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

public saveUserId(userId: string) {
    window.sessionStorage.removeItem(AUTHUSERID_KEY);
    window.sessionStorage.setItem(AUTHUSERID_KEY, userId);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
public getUserId(): string {
    return sessionStorage.getItem(AUTHUSERID_KEY);
  }
  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: string) => {
        this.roles.push(authority);
      });
    }

    return this.roles;
  }

  public saveDefaultRoleId(defaultRoleId: string) {
    window.sessionStorage.removeItem(AUTHDEFAULTROLEID_KEY);
    window.sessionStorage.setItem(AUTHDEFAULTROLEID_KEY, defaultRoleId);
  }

  public getDefaultRoleId(): string {
    return sessionStorage.getItem(AUTHDEFAULTROLEID_KEY);
  }

  public saveDefaultRole(defaultRole: string) {
    window.sessionStorage.removeItem(AUTHDEFAULTROLE_KEY);
    window.sessionStorage.setItem(AUTHDEFAULTROLE_KEY, defaultRole);
  }

  public getDefaultRole(): string {
    return sessionStorage.getItem(AUTHDEFAULTROLE_KEY);
  }

  public saveCustomerCompanyCode(companyCode: string){
    window.sessionStorage.removeItem(AUTHCUSTOMERCOMPANYCODE_KEY);
    window.sessionStorage.setItem(AUTHCUSTOMERCOMPANYCODE_KEY, companyCode);
  }

  public getCustomerCompanyCode(){
    return sessionStorage.getItem(AUTHCUSTOMERCOMPANYCODE_KEY);
  }

  public saveImgUrl(imgUrl: string){
    window.sessionStorage.removeItem(AUTHIMGURL_KEY);
    window.sessionStorage.setItem(AUTHIMGURL_KEY, imgUrl);
  }

  public getImgUrl(){
    return sessionStorage.getItem(AUTHIMGURL_KEY);
  }
}
