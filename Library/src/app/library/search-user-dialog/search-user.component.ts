import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { UserProfileModel } from '../models/user-profile.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SnackBarComponent } from '../snackbar/snackbar.component';
import { DataFetchService } from '../services/data-fetch.service';
import { HtmlParser } from '@angular/compiler';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { CollectionViewer } from '@angular/cdk/collections';




@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],

})
export class SearchUserComponent implements OnInit {

  constructor( private _snackBar: SnackBarComponent,
    private _dataFetchService: DataFetchService,
    public dialogRef: MatDialogRef<SearchUserComponent>
    ) { }

    searchString: string = '';
    userProfileModel: UserProfileModel = new UserProfileModel();
    users: any;


  ngOnInit(): void {
  
  }
  searchInput(e: any) {
    this.searchString = e.target.value;
    this._dataFetchService.searchUSer(this.searchString).subscribe(
      {
        next: (data) =>{
          this.users = data;
        
        },
        error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
      }
    );

  }

  choice(user: any){
 
      this.dialogRef.close(user);

  }


  cancel():void{
    this.dialogRef.close();
  }

}
