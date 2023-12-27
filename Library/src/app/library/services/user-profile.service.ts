import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserProfileModel } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }


  fetchUserData(){
    return this._http.get<UserProfileModel>(this._baseUrl + 'user/user');
  }
}
