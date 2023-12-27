import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = localStorage.getItem('token');
    
    if(jwtToken != null){
      request = request.clone({
        setHeaders:{
          'Authorization': 'Bearer ' + jwtToken
        }
      })
    }
    return next.handle(request);
  }
}
