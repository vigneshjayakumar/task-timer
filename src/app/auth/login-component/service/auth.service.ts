import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { UserInfo } from '../userInfo.model';

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
  private logOutTimer: any;
  userLoginInfo = new BehaviorSubject<UserInfo>(null!);

  constructor(private http: HttpClient, private router: Router) {}

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
        })
      );
  }

  logOut() {
    this.userLoginInfo.next(null!);
    localStorage.removeItem('UserInfo');
    this.router.navigate(['/Login']);
    if (this.logOutTimer) {
      clearTimeout(this.logOutTimer);
    }
    this.logOutTimer = null;
  }

  autoLogIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('UserInfo')!);
    if (!userData) {
      return;
    }
    const loadeduser = new UserInfo(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadeduser.token) {
      this.userLoginInfo.next(loadeduser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  autoLogOut(expiresInDuration: number) {
    this.logOutTimer = setTimeout(() => {
      this.logOut();
    }, expiresInDuration);
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
