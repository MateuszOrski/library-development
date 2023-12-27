import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthorModel } from '../models/author.model';
import { BookAddModel } from '../models/Book-add.model';
import { PublishingHouseModel } from '../models/publishing-house.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _baseUrl = environment.baseUrl + 'book/';

  constructor(private _http: HttpClient) { }

  fetchAuthors(){
    return this._http.get<AuthorModel[]>(this._baseUrl + 'authors');
  }

  fetchPublishingHouses(){
    return this._http.get<PublishingHouseModel[]>(this._baseUrl + 'publishinghouses');
  }

  addNewBook(newBook: BookAddModel){
    return this._http.post<BookAddModel>(this._baseUrl + 'add', newBook);
  }

  editBook(bookToEdit: BookAddModel){
    return this._http.post<BookAddModel>(this._baseUrl + 'edit', bookToEdit);
  }

  deleteBook(bookID: number){
    return this._http.get(this._baseUrl + 'delete/' + 'id=' + bookID);
  }
}
