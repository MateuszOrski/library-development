import { style } from '@angular/animations';
import { getCurrencySymbol } from '@angular/common';
import {Component, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'snackbar',
  templateUrl: 'snackbar.component.html',
  styleUrls: ['snackbar.component.css'],
})
export class SnackBarComponent{
  
  constructor(private snackBar: MatSnackBar) {}



  openSnackBar(message: string, action: Boolean) {
    
  
    if(action == true){
      this.snackBar.open(message, 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['green-snackbar'],
      });
    
    }   
    else{
      this.snackBar.open(message, 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['red-snackbar'],
      });
    }
    
   
  }
}
