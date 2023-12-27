import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _baseUrl = environment.baseUrl + 'admin/';
  private _changeUserRoleUrl = this._baseUrl + 'account/roles/';
  private _changeUserAccStatus = this._baseUrl + 'account/status/';

  constructor(private _http: HttpClient) { }

  changeUserPermissions(userID: number, roleId: number){
    return this._http.get(this._changeUserRoleUrl + userID + '/' + roleId);
  }

  changeUserAccountStatus(userID: number, accountStatus: boolean){
    return this._http.get(this._changeUserAccStatus + userID + '/' + accountStatus);
  }
}
