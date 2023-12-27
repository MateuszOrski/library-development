import { Component, OnInit } from '@angular/core';
import { AuthorModel } from '../../models/author.model';
import { BookAddModel } from '../../models/Book-add.model';
import { BookDetails } from '../../models/bookDetails.model';
import { Category } from '../../models/category.model';
import { PublishingHouseModel } from '../../models/publishing-house.model';
import { BookService } from '../../services/book.service';
import { DataFetchService } from '../../services/data-fetch.service';
import { SnackBarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit {

  userSelectionList: any;
  selectedBook: any;

  constructor(private _bookService: BookService, private _fetchDataService: DataFetchService, private _snackBar: SnackBarComponent) {
  }

  ngOnInit(): void {
  }

  submitAddBook(book: BookAddModel){
    this._bookService.addNewBook(book).subscribe({
      next: () => {
        this._snackBar.openSnackBar("This operation was Successful!", true);
    },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)

    })
  }

  submitEditBook(book: BookAddModel){
    this._bookService.editBook(book).subscribe({
      next: () => {
        this._snackBar.openSnackBar("This operation was Successful!", true);
    },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    })
  }

  getSearchedBooks(selectionString: string){
    this._fetchDataService.fetchBooksPage(1000, 0, 0, selectionString).subscribe({
      next: (data) => {
        this.userSelectionList = data
      },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    })
  }

  deleteBook(){
    this._bookService.deleteBook(this.selectedBook).subscribe({
      next: () => {
        this._snackBar.openSnackBar("This operation was Successful!", true);
    },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    })
  }
}
