import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { BookCardComponent } from './book-card/book-card.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BookDetailsComponent } from './book-details/book-details.component';
import {MatMenuModule} from '@angular/material/menu';
import { ConfirmationDialogComponent } from './confirmation-dialog/reservation-dialog.component';
import { BorrowingDialogComponent } from './borrowing-dialog/borrowing-dialog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileCardComponent } from './user-profile/user-profile-card/user-profile-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackBarComponent } from './snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { ReservationsTableComponent } from './user-profile/reservations-table/reservations-table.component';
import { BorrowingsTableComponent } from './user-profile/borrowings-table/borrowings-table.component';
import { SearchUserComponent } from './search-user-dialog/search-user.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { ReturnBookComponent } from './employee-panel/return-book/return-book.component';
import { DeleteReservationComponent } from './employee-panel/delete-reservation/delete-reservation.component';
import { AccountStatusPipe } from '../pipes/account-status.pipe';
import { BooksManagementComponent } from './employee-panel/books-management/books-management.component';
import { MatInputModule } from '@angular/material/input';
import { BookFormComponent } from './employee-panel/books-management/book-form/book-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccessDeniedComponent } from '../error-pages/access-denied/access-denied.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    BookCardComponent,
    BookDetailsComponent,
    ConfirmationDialogComponent,
    BorrowingDialogComponent,
    UserProfileComponent,
    UserProfileCardComponent,
    SnackBarComponent,
    ReservationsTableComponent,
    BorrowingsTableComponent,
    SearchUserComponent,
    UserProfileCardComponent,
    AdminPanelComponent,
    EmployeePanelComponent,
    ReturnBookComponent,
    DeleteReservationComponent,
    BooksManagementComponent,
    BookFormComponent,
    AccessDeniedComponent,
    AccountStatusPipe
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    NgSelectModule,
    MatTooltipModule
  ],
  exports: [
    NavbarComponent,
    MatFormFieldModule,
  ],
  providers: [
    MatSnackBar,
   
    ]
  
  
})
export class LibraryModule { }
