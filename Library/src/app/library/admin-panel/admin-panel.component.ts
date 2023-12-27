import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { UserProfileModel } from '../models/user-profile.model';
import { SearchUserComponent } from '../search-user-dialog/search-user.component';
import { AdminService } from '../services/admin.service';
import { SnackBarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  user: UserProfileModel;
  roles = UserRoles;
  selectedRole: any;

  constructor(private _searchUserDialog: MatDialog, private _adminService: AdminService,private _snackBar: SnackBarComponent) { }

  ngOnInit(): void {
  }

  searchUserOpen(){
    this._searchUserDialog.open(SearchUserComponent,{ panelClass: 'custom-dialog-container'}).afterClosed().subscribe({
      next: (data) => this.user = data,
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    })
  }

  changeUserRole(userID: number, role: any){
    this._adminService.changeUserPermissions(userID, role.value).subscribe({
      next: () => this.user.role = role.key,
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    });
  }

  changeUserAccountStatus(userID: number){
    let newStatus: boolean;
    if(this.user.isActive) newStatus = false;
    else newStatus = true; 
    this._adminService.changeUserAccountStatus(userID, newStatus).subscribe({
      next: () => this.user.isActive = newStatus,
    
      error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
    });
    console.log(newStatus);
  }
}

const UserRoles ={
  'Admin' : 1,
  'Employee' : 2,
  'Customer' : 3
};
