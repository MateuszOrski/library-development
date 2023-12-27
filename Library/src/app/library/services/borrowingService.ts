import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { SnackBarComponent } from '../snackbar/snackbar.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class borrowingService
{
    private _baseUrl = environment.baseUrl + 'employee/';
    private snackBar:SnackBarComponent;
    

    constructor(private http: HttpClient, private _router: Router) { }

    public DoNewBorrowing(iD_Client: number,ID_Book : number)
    {
        return this.http.post(this._baseUrl + 'borrowing/add', {iD_Client, ID_Book});
    }

    public setReturnForBorrow(idBorrowing: number)
    {
        return this.http.get(this._baseUrl + 'borrowing/update/id=' + idBorrowing);
    }
}


