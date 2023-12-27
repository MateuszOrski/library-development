import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { SnackBarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-borrowings-table',
  templateUrl: './borrowings-table.component.html',
  styleUrls: ['./borrowings-table.component.css']
})
export class BorrowingsTableComponent implements OnInit {

  userCurrentBorrowings: any;
  userHistoryOfBorrowings: any;
  keyArray: any;

  constructor(private _userDataService: UserDataService,
    private _snackBar: SnackBarComponent
    ) { }

  ngOnInit(): void {
    this.getCurrentBorrowings();
    this.getHistoryOfBorrowings();
  }

  getCurrentBorrowings(){
    this._userDataService.fetchCurrentBorrowings().subscribe({
      next: (data) => { 
        this.userCurrentBorrowings = data;
        if(this.userCurrentBorrowings.length!=0)
          this.keyArray = Object.keys(this.userCurrentBorrowings[0])
      },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    })
  }

  getHistoryOfBorrowings(){
    this._userDataService.fetchHistoryOfBorrowings().subscribe({
      next: (data) => { 
        this.userHistoryOfBorrowings = data;
        if(this.userHistoryOfBorrowings.length!=0)
          this.keyArray = Object.keys(this.userHistoryOfBorrowings[0])
      },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    })
  }

}
