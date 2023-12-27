import { Component, OnInit } from '@angular/core';
import { UserProfileModel } from '../../models/user-profile.model';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.css'],
})
export class UserProfileCardComponent implements OnInit {

  userData: UserProfileModel = new UserProfileModel();
  isDataLoaded: boolean = false;

  constructor(private _userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this._userProfileService.fetchUserData().subscribe(
      {
        next: (data) => {
          this.userData = data;
          this.isDataLoaded = true;
        },
        error: error => console.log(error)
      }
    )
  }

}
