import { Component, Input, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SnackBarComponent } from '../snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  

  constructor( 
     public dialogRef: MatDialogRef<ConfirmationDialogComponent>, 
     ) { }

  ngOnInit(): void {
  }

  bookIt(): void{
     
      this.dialogRef.close(true);

  } 

    onNoClick(): void {
    this.dialogRef.close(false);
  }

}
