import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../roles';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _authService: AuthService,private _router: Router){}

  canActivate(route: ActivatedRouteSnapshot){
    console.log('guard dziala');
    if(route.data['role']){
      let roleData: Roles = route.data['role'];
      if(roleData >= this._authService.userRole) return true;
    }
    this._router.navigate(['accessdenied']);
    return false;
  }
  
}
