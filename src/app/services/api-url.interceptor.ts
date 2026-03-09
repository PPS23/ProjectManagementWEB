import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Si la URL ya es absoluta, no tocarla
    if (req.url.startsWith('http')) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');
    
    const apiReq = req.clone({
      url: `${environment.apiUrl}/${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(apiReq).pipe(

      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })

    );
  }
}
