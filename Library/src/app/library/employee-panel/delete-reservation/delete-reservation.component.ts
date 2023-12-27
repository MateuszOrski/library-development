import { DialogModule } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchUserComponent } from '../../search-user-dialog/search-user.component';
import { UserProfileModel } from '../../models/user-profile.model';
import { reservationService } from '../../services/reservation.service';
import { UserDataService } from '../../services/user-data.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/reservation-dialog.component';
import { SnackBarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css']
})
export class DeleteReservationComponent implements OnInit {

  constructor(
    private snackBar: SnackBarComponent,
    private dialog: MatDialog,
    private reservationService: reservationService,
    private userDataService: UserDataService,

  ) { }

  public userProfile: UserProfileModel = new UserProfileModel();
  public userCurrentReservations: any;
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
       
          this.getCurrentReservations(this.userProfile.login);
        }
      
      },
      error: () => console.log('borrowing dialog not works')
    });
   
  }

  getCurrentReservations(login: string){
    this.userDataService.fetchCurrentReservations(login).subscribe({
      next: (data) => { 
        this.userCurrentReservations = data;

      },
      error: () => console.log('Something went wrong with getting current reservations')
    })
  }

  choice(row:any):void
  {
    this.dialog.open(ConfirmationDialogComponent).afterClosed().subscribe({
      next: (data) => {
        if(data==true)
        {
          this.reservationService.deleteReservation(row.id)
          .subscribe({
            next: () => {
             this.snackBar.openSnackBar("This operation was Successful!", true);
             this.getCurrentReservations(this.userProfile.login);
            },
            error: () => this.snackBar.openSnackBar("This operation was a Failure!", false)
          })   

        }
      
      }
    });


  }
}
