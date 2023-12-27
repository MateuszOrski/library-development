import { NgModule } from '@angular/core';
import { LibraryModule } from './library/library.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './authentication/components/login-form/login-form.component';
import { RegisterFormComponent } from './authentication/components/register-form/register-form.component';
import { HomeComponent } from './library/home/home.component';
import { BorrowingDialogComponent } from './library/borrowing-dialog/borrowing-dialog.component';
import { BookDetailsComponent } from './library/book-details/book-details.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { UserProfileComponent } from './library/user-profile/user-profile.component';
import { AdminPanelComponent } from './library/admin-panel/admin-panel.component';
import { EmployeePanelComponent } from './library/employee-panel/employee-panel.component';
import { Roles } from './authentication/roles';
import { RoleGuard } from './authentication/guards/role.guard';
import { AuthGuard } from './authentication/guards/auth.guard';
import { AccessDeniedComponent } from './error-pages/access-denied/access-denied.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'user', component: UserProfileComponent },
      { path: 'employee', canActivate: [RoleGuard], data: { role: Roles.Employee }, component: EmployeePanelComponent },
      { path: 'employee/:tab', canActivate: [RoleGuard], data: { role: Roles.Employee }, component: EmployeePanelComponent },
      { path: 'admin', canActivate: [RoleGuard], data: { role: Roles.Admin }, component: AdminPanelComponent },
    ]
  },
  { path: 'bookDetails/:idBook', component: BookDetailsComponent },
  { path: 'bookDetails/:idBook/borrow', component: BorrowingDialogComponent },
  { path: 'accessdenied', component: AccessDeniedComponent },
  { path: '**', component: PageNotFoundComponent }

]

@NgModule({
  imports: [
    AuthenticationModule,
    LibraryModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
