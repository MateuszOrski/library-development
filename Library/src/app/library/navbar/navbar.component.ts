import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchString: string = '';

  constructor(public homeService: HomeService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  searchInput(e: any) {
    this.searchString = e.target.value;
    this.homeService.sendUpdatedSearchString(this.searchString);
  }

  logout(){
    this.authService.logout();
  }
}
