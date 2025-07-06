import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OauthService {
  jwtPayload: any;
  tokensRevokeUrl = environment.apiUrl + "/tokens/revoke";
  oauthTokenUrl = environment.apiUrl + "/oauth2/token";
  oauthAuthorizeUrl = environment.apiUrl + "/oauth2/authorize"; 

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
  }

  /*login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response.access_token);
        //this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        if(response.status === 400){
          if(response.error.error === 'invalid_grant'){
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(response);
      });
  }*/

  login() {
    const state = 'abc';
    const challengeMethod = 'plain'
    const codeChallenge = 'desafio123'
    const redirectURI = encodeURIComponent(environment.oauthCallbackUrl);

    const clientId = 'angular'
    const scope = 'read write'
    const responseType = 'code'

    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'scope=' + scope,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod,
      'state=' + state,
      'redirect_uri=' + redirectURI 
    ]

    window.location.href = this.oauthAuthorizeUrl + '?' +  params.join('&');
  }

  public armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem("token", token);
  }

  public carregarToken() {
    const token = localStorage.getItem("token");

    if (token) {
      this.armazenarToken(token);
    }
  }

  obterRefreshToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append("Content-Type", "application/x-www-form-urlencoded")
      .append("Authorization", "Basic YW5ndWxhcjpAbmd1bEByMA==");

    const body = "grant_type=refresh_token";

    return this.http
      .post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response: any) => {
        //this.armazenarToken(response['access_token']);
        this.armazenarToken(response.access_token);
        console.log("Novo access token criado!");

        return Promise.resolve();
      })
      .catch((response) => {
        console.error("Erro ao renovar token.", response);
        return Promise.resolve();
      });
  }

  haspermission(permission: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem("token");
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.haspermission(role)) {
        return true;
      }
    }

    return false;
  }

  limparAccessToken() {
    localStorage.removeItem("token");
    this.jwtPayload = null;
  }

  logout() {
    return this.http
      .delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.limparAccessToken();
      });
  }
}
