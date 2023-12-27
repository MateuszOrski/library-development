import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  onSearchStringChanged$ = new BehaviorSubject<string>('');

  isHomePageActive: boolean = false;

  constructor() { }

  getUpdatedSearchString(): Observable<string> {
    return this.onSearchStringChanged$.asObservable();
  }

  sendUpdatedSearchString(searchString: string){
    this.onSearchStringChanged$.next(searchString)
  }
}
