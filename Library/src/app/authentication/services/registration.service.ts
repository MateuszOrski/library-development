import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private _baseUrl = environment.baseUrl;
  private _registerUrl = this._baseUrl + 'account/register';
  didUserJustRegister = false;

  constructor(private http: HttpClient) { }
  
  register(account: any) {
    return this.http.post(this._registerUrl, account,{responseType: 'text', observe: 'response'}).pipe(
     map(res => {
      this.didUserJustRegister = true;
      return res;
    }
    ));
 }
}


