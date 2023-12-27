import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
import { RegistrationService } from '../../services/registration.service';
import { SnackBarComponent } from 'src/app/library/snackbar/snackbar.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../../forms.css']
})
export class RegisterFormComponent implements OnInit {

  loginForm: FormGroup;
  registrationSuccesful: boolean = false;
  matcher : PasswordNotSameMatcher

  constructor(private formBuilder: FormBuilder, private _regService: RegistrationService, private _snackBar: SnackBarComponent) { 
    this.matcher = new PasswordNotSameMatcher()
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      fisrtName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['',Validators.minLength(8)],
      confirmPassword: ['',],
      email: ['', Validators.email]
    },
    { validator: this.checkPasswords });
  }

  register() {
    if(this.loginForm!=null){
      this._regService.register(this.loginForm.value)
      .pipe(first())
      .subscribe(
        {
          next: () =>  { this.registrationSuccesful = true },
          error: () => this._snackBar.openSnackBar("This operation was a Failure!", false)
        }
      )
      }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }
}

class PasswordNotSameMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidParent = !!(control?.parent?.hasError('notSame') && control?.parent?.dirty);

      return invalidParent;
  }
}
