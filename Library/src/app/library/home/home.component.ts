import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../services/home.service';
import { first } from 'rxjs';
import { DataFetchService } from '../services/data-fetch.service';
import { SnackBarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchString: string = '';

  pageSize :number = 20;
  pageNumber: number = 0;
  categoryID: number = 0;
  books: any;
  categories: any;

  constructor(private _homeService: HomeService, private _dataFetchService: DataFetchService, private _snackBar: SnackBarComponent) {
    _homeService.isHomePageActive= true;
   }

  ngOnInit(): void {
    this.loadCategories();
    this.loadBooksPage();
    this._homeService.getUpdatedSearchString().subscribe( ret => {
      this.searchString = ret;
      this.pageNumber = 0;
      this.loadBooksPage();
    })
  }

  ngOnDestroy(): void {
    this._homeService.isHomePageActive = false;
  }

  loadCategories() {
    this._dataFetchService.fetchCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => this._snackBar.openSnackBar("Loading categories was a Failure!", false)
    });
  }

  loadBooksPage(){
    this._dataFetchService.fetchBooksPage(this.pageSize, this.pageNumber, this.categoryID, this.searchString).subscribe({
      next: (data) => {
        this.books = data;
      },
      error: () => this._snackBar.openSnackBar("TLoading books was a Failure!", false)
    })
  }

  onCategoryChanged(e: any) {
    this.categoryID = e[0].value;
    this.pageNumber = 0;
    this.loadBooksPage()
  }

  public loadNextPage(e: any) {
    this.pageNumber = e.pageIndex;
    this.loadBooksPage();
    
  }

  
}