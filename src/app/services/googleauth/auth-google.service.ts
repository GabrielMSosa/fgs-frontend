import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oauthService: OAuthService) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '561325385455-0esuj4q1ck1tq2rpjg9mmlm97a55mbvd.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/main',
      scope: 'openid profile email',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }
//: Observable<IUser[]>

  logout() {
    this.oauthService.logOut();
  }

  getToken(){
    return  this.oauthService.getAccessToken();
  }
  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

}
