import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { reservationService } from '../../services/reservation.service';
import { UserDataService } from '../../services/user-data.service';
import { SnackBarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {
  userCurrentReservations: any;
  userHistoryOfReservations: any;
  keyArray: any;

  selectedRow: any;

  constructor(private _userDataService: UserDataService,
     private _reservationService: reservationService,
     private _snackBar: SnackBarComponent
     ) { }

  ngOnInit(): void {
    this.getUserReservations();
  }

  getUserReservations(){
    this._userDataService.fetchCurrentReservations().subscribe({
      next: (data) => { 
        this.userCurrentReservations = data;
        if(this.userCurrentReservations.length != 0)
          this.keyArray = Object.keys(this.userCurrentReservations[0])
      },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    })
  }

  selectRow(row: any){
    if(row == this.selectedRow) this.selectedRow = null;
    else this.selectedRow = row;
  }

  onDeleteReservationButtonClick(selectedReservationID: number){
    this._reservationService.deleteReservation(selectedReservationID).subscribe({
      next: () => {
        
        this.getUserReservations();
      },
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    })
  }
}
