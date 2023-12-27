import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SnackBarComponent } from '../snackbar/snackbar.component';
import { borrowingService } from '../services/borrowingService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileModel } from '../models/user-profile.model';
import { SearchUserComponent } from '../search-user-dialog/search-user.component';
import { BookDetails } from '../models/bookDetails.model';

@Component({
  selector: 'app-borrowing-dialog',
  templateUrl: './borrowing-dialog.component.html',
  styleUrls: ['./borrowing-dialog.component.css']
})
export class BorrowingDialogComponent implements OnInit {

  constructor(private _snackBar: SnackBarComponent,
    private _borrowingService: borrowingService,
    private _dialogRef: MatDialogRef<BorrowingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { book: any },
    private _dialog: MatDialog,
   
  ) { }



  public userProfile: UserProfileModel = new UserProfileModel();
  public dataIsDownload: boolean;


  bookDetails: BookDetails = new BookDetails();
  
  ngOnInit(): void {
    this.dataIsDownload = false;
    this.bookDetails = this._data.book;
  }

  fetchUserData(): void {

    this._dialog.open(SearchUserComponent,{
      panelClass: 'custom-dialog-container'
    }).afterClosed().subscribe({
      next: (data) => {
        if(data!=null)
        {
          this.userProfile = data;
        
          this.dataIsDownload = true
        }
      
      },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    });
  }

  addNewBorrowing(): void {
    this._borrowingService.DoNewBorrowing(this.userProfile.id, this.bookDetails.BookID)
      .subscribe({
        next: () => {
          this._snackBar.openSnackBar("This operation was Successful!", true);
          this._dialogRef.close();
        },
        error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
      });
  }

  onNoClick(): void {
    this._dialogRef.close();
  }



}
