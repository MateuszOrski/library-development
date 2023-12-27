
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input, Optional, ViewEncapsulation } from '@angular/core';
import { BookDetails } from '../models/bookDetails.model';
import { BookDetailsService } from '../services/bookDetails.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BorrowingDialogComponent } from '../borrowing-dialog/borrowing-dialog.component';
import { reservationService } from '../services/reservation.service';
import { SnackBarComponent } from '../snackbar/snackbar.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/reservation-dialog.component';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookDetailsComponent implements OnInit {



  @Input() bookID: number;
  bookDetails: BookDetails =  new BookDetails();


  constructor(public _bookDetailsService: BookDetailsService,
     private _route: ActivatedRoute, 
     public _dialog: MatDialog,
     private _reservationService: reservationService,
     private _snackBar: SnackBarComponent,
     public authService: AuthService
      ) {
 
   }

  ngOnInit(): void {
  
  this.bookID = Number(this._route.snapshot.paramMap.get('idBook'));


   this.loadBookDetails();

  }

  loadBookDetails(){
    this._bookDetailsService.getBookDetails(this.bookID).subscribe({
      next: (data) => {
        this.bookDetails.BookID = this.bookID;
        this.bookDetails.title = data.title;
        this.bookDetails.author = data.author;
        this.bookDetails.publishing = data.publishing;
        this.bookDetails.category = data.category;
        this.bookDetails.yearOfPublishment = data.yearOfPublishment;
        this.bookDetails.quantity = data.quantity;
        this.bookDetails.description = data.description;
        
        
      
      },
      
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
      
      
    })
  }

  openDialog(): void {

    this._dialog.open(ConfirmationDialogComponent).afterClosed().subscribe({
      next: (data) => {
        if(data==true)
        {
          this._reservationService.DoReservation(this.bookDetails.BookID).subscribe({
            next: () => {
            this._snackBar.openSnackBar("The booking was Successful!", true);
    
            },
            
            error: error=> this._snackBar.openSnackBar("The booking was a Failure!", false)
      
                 
          });

        }
      
      
      }
    });

  }




  openDialogBorrow(): void {

    this._dialog.open(BorrowingDialogComponent, {
      data: {book: this.bookDetails},
      panelClass: 'custom-dialog-container'
      
    });
  }
}


