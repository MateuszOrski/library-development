import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Location } from '@angular/common';
import { SnackBarComponent } from 'src/app/library/snackbar/snackbar.component';
import { RegistrationService } from '../../services/registration.service';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../../forms.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;


  

  constructor(private formBuilder: FormBuilder, private _auth: AuthService, 
              private _location: Location, private _registrationService: RegistrationService,
              private _router: Router, private _snackBar: SnackBarComponent) { }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', ],
      password: ['',Validators.minLength(8)]
    });
  }

  login() {
    if(this.loginForm!=null){
    this._auth.login(this.loginForm.get('email')!.value, this.loginForm.get('password')!.value)
    .pipe(first())
    .subscribe(
      {

        next: () =>  { 
          if(this._registrationService.didUserJustRegister == true){
            this._registrationService.didUserJustRegister = false;
            this._router.navigate(['/home']);
          }else{
            this._location.back();
          }},
          error: () => { this._snackBar.openSnackBar("Incorrect login details!", false) },

      }
    )
    }
  };

}
