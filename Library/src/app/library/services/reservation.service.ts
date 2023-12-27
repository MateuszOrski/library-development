import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { SnackBarComponent } from '../snackbar/snackbar.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class reservationService
{
    private _baseUrl = environment.baseUrl;
    private snackBar:SnackBarComponent;
    
    constructor(private http: HttpClient, private _router: Router) { }

    public DoReservation(id:number)
    {
        return this.http.post(this._baseUrl + 'home/details/reservation/add',id);
    }

    public deleteReservation(idReservation: number){
      return this.http.delete(this._baseUrl + 'user/reservation/delete/'+ idReservation);
    }

}


