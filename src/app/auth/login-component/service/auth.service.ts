import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { UserInfo } from '../userInfo.model';
import { BehaviorSubject } from 'rxjs';

export interface IAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_KEY = `AIzaSyAxWH15bg49qMpLWTXDbvJBpDz9ssaLK9w`;
  userLoginInfo = new BehaviorSubject<UserInfo>(null!);

  constructor(private http: HttpClient) {}

  signUp(signUp: { email: string; password: string }) {
    return this.http
      .post<IAuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          email: signUp.email,
          password: signUp.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((signUpData) => {
          this.handleAuthUserInfo(
            signUpData.email,
            signUpData.localId,
            signUpData.idToken,
            +signUpData.expiresIn
          );
        })
      );
  }

  login(LoginData: { email: string; password: string }) {
    return this.http
      .post<IAuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        {
          email: LoginData.email,
          password: LoginData.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((LoginData) => {
          this.handleAuthUserInfo(
            LoginData.email,
            LoginData.localId,
            LoginData.idToken,
            +LoginData.expiresIn
          );
          console.log(LoginData);
        })
      );
  }

  private handleAuthUserInfo(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expiresInTime = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserInfo(email, localId, idToken, expiresInTime);
    this.userLoginInfo.next(user);
    localStorage.setItem('UserInfo', JSON.stringify(user));
  }
}
