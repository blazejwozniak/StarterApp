import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BASIC_URL} from "../app.constants";

export class AuthenticationBean {
  constructor(public message: string){}
}

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeJWTAuthentiactionService(username, password) {

    return this.http.post<any>(`${BASIC_URL}/authenticate`, {
      username,
      password
    })
      .pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  }


  executeAuthentiactionService(username, password) {
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader(username, password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`${BASIC_URL}/basicauth`, {headers})
      .pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
      );
  }

  createBasicAuthenticationHttpHeader(username, password){
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    return basicAuthHeaderString;
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(){
    if (this.getAuthenticatedUser()){
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);

  }
}
