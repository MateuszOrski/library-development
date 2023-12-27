import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category.model';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';
import { UserProfileModel } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

  private _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  fetchCategories() {
    return this._http.get<Category[]>(this._baseUrl + 'home');
  }

  fetchBooksPage(pagesize: number, page:number, categoryID: number, searchString: string)  {
    if(searchString == '') return this._http.get<Book>(this._baseUrl + 'home/' + 'page=' + page + '/fetch=' + pagesize + '/category/id=' + categoryID);
    else return this._http.get<Book>(this._baseUrl + 'home/' + 'page=' + page + '/fetch=' + pagesize + '/category/id=' + categoryID + '/search=' + searchString);
  }

  searchUSer(searchString: string){
    let searchUSerUrl = this._baseUrl + 'employee/search=';  
    return this._http.get<UserProfileModel>(searchUSerUrl+searchString)
  }
}
