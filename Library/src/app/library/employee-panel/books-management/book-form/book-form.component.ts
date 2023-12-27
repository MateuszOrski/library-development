import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { BookAddModel } from 'src/app/library/models/Book-add.model';
import { DataFetchService } from 'src/app/library/services/data-fetch.service';
import { BookService } from 'src/app/library/services/book.service';
import { AuthorModel } from 'src/app/library/models/author.model';
import { Category } from 'src/app/library/models/category.model';
import { PublishingHouseModel } from 'src/app/library/models/publishing-house.model';
import { BookDetailsService } from 'src/app/library/services/bookDetails.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  authors: AuthorModel[];
  publishingHouses: PublishingHouseModel[];
  categories: Category[];

  @Input() bookID: number = -1;
  @Output() submitFormEvent = new EventEmitter<BookAddModel>();

  book: BookAddModel;

  constructor(private _bookService: BookService, private _dataFetch: DataFetchService, 
    private _bookDetailsService: BookDetailsService) {
    this.book = new BookAddModel();
   }

   ngOnInit(): void {
    this.getAuthors();
    this.getPublishingHouses();
    this.getCategories();
    this.book.description = 'test';
  }

  ngOnChanges(changes: SimpleChanges): any{
    
    if(changes['bookID'].previousValue != changes['bookID'].currentValue && changes['bookID'].currentValue != -1){
      this._bookDetailsService.getBookDetails(this.bookID).subscribe({
        next: (data) => {
          this.book.bookId = this.bookID;
          this.book.title = data.title;
          this.book.categoryID = this.categories.find(element => element.name == data.category)!.id;
          this.book.authorID = this.authors.find(element => element.authorName == data.author)!.id;
          this.book.publishingHouseID = this.publishingHouses.find(element => element.publishingName = data.publishing)!.id;
          this.book.yearOfPublishment = data.yearOfPublishment;
          this.book.quantity = data.quantity;
        },
        error: error => console.log('pobieranie ksaizki po id nie pyklo')
      })
    }
  }

  getAuthors(){
    this._bookService.fetchAuthors().subscribe({
      next: (data) => {
        this.authors = data;
      },
      error: () => console.log('pobieranie autorow poszlo nie tak')
    })
  }

  getPublishingHouses(){
    this._bookService.fetchPublishingHouses().subscribe({
      next: (data) => this.publishingHouses = data,
      error: () => console.log('pobieranie wydawcow poszlo nie tak')
    })
  }

  getCategories(){
    this._dataFetch.fetchCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => console.log('pobieranie kategorii poszlo nie tak')
    })
  }

  submitForm(){
    this.submitFormEvent.emit(this.book);
  }

}
