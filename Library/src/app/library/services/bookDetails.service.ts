import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BookDetails } from '../models/bookDetails.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class BookDetailsService{

    private _baseUrl = environment.baseUrl + 'home/details/'
    

    constructor(private http: HttpClient) { }

    getBookDetails(IdBook: number){
        
         return this.http.get<BookDetails>(this._baseUrl + 'book/id=' + IdBook);
    } 
}
