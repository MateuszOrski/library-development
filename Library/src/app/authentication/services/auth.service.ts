import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { LoginResponse } from '../login-response.model';
import { Token } from '@angular/compiler';
import { Roles } from '../roles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = environment.baseUrl;
  private _loginUrl = this._baseUrl + 'account/login';

  isUserLoggedIn: boolean;
  userRole: Roles;
  username: string = '';

 login(username: string, password: string) {
     return this.http.post<LoginResponse>(this._loginUrl,{username,password}).pipe(
      map(res => {
        if(res)
          localStorage.setItem('roleId', String(res.roleID));
          localStorage.setItem('username', res.userName);
          localStorage.setItem('token', res.token);
          this.username = res.userName;
          this.userRole = res.roleID;
          this.isUserLoggedIn = true;
          return res;
        }
     ));
  }

  logout(){
    this.isUserLoggedIn = false;
    localStorage.removeItem('roleId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  constructor(private http: HttpClient, private _router: Router) { 
    if(localStorage.getItem('token')
    &&localStorage.getItem('username')
    &&localStorage.getItem('roleId')){
      this.isUserLoggedIn = true;
      this.userRole = Number(localStorage.getItem('roleId'));
      this.username = localStorage.getItem('username')!!;
    }
    else this.isUserLoggedIn = false;
  }
}
