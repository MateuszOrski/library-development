import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BorrowingModel } from '../models/borrowing.model';
import { ReservationModel } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _baseUrl = environment.baseUrl + 'user/';
  private _username = localStorage.getItem('username');

  constructor(private _http: HttpClient) { }


  fetchCurrentReservations(login?:string) {
    let tempUsr;
    if(login != null){
      tempUsr = login;
     
    }
    else{
      tempUsr = this._username
    }
    return this._http.get<ReservationModel>(this._baseUrl + 'reservations/current/=' + tempUsr);
  }

  fetchCurrentBorrowings(login?:string){
    let tempUsr;
    if(login != null){
      tempUsr = login;
    }
    else{
      tempUsr = this._username
    }
   
    return this._http.get<BorrowingModel>(this._baseUrl + 'borrowings/current/username=' + tempUsr);
  }

  fetchHistoryOfBorrowings(){
    return this._http.get<BorrowingModel>(this._baseUrl + 'borrowings/history/username=' + this._username);
  }
}
