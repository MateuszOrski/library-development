import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../models/user-profile.model';
import { SearchUserComponent } from '../../search-user-dialog/search-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDataService } from '../../services/user-data.service';
import { borrowingService } from '../../services/borrowingService';
import { SnackBarComponent } from '../../snackbar/snackbar.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {

  constructor( public dialog: MatDialog,
     private _userDataService: UserDataService,
     private _snackBar: SnackBarComponent, 
     private _borrowingService: borrowingService) { }

  public userProfile: UserProfileModel = new UserProfileModel();
  public dataIsDownload: boolean;
  userCurrentBorrowings: any;
  keyArray: any;
  

  ngOnInit(): void {

    
  }


  fetchUserData(): void {

    this.dialog.open(SearchUserComponent,{
      panelClass: 'custom-dialog-container'
    }).afterClosed().subscribe({
      next: (data) => {
        if(data!=null)
        {
          this.userProfile = data;
       
          this.getCurrentBorrowings(this.userProfile.login);
        }
      
      },
      error: () => console.log('borrowing dialog not works')
    });
   
 
  }

  getCurrentBorrowings(login: string){
    this._userDataService.fetchCurrentBorrowings(login).subscribe({
      next: (data) => { 
        this.userCurrentBorrowings = data;

      },
      error: () => console.log('Something went wrong with getting current borrwonigs')
    })
  }

  choice(row:any):void
  {
    this.dialog.open(ConfirmationDialogComponent).afterClosed().subscribe({
      next: (data) => {
        if(data==true)
        {
          this._borrowingService.setReturnForBorrow(row.id)
          .subscribe({
            next: () => {
             this._snackBar.openSnackBar("This operation was Successful!", true);
             this.getCurrentBorrowings(this.userProfile.login);
            },
            error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
          })   

        }
      
      }
    });


  }


}
