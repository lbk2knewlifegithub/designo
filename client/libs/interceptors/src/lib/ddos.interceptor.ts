import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DDosInterceptor implements HttpInterceptor {
  constructor(private readonly _dialogService: DialogService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(null, (error) => {
        if (!(error instanceof HttpErrorResponse)) return;
        if (error.statusText !== 'Too Many Requests') return;
        this._dialogService.error(
          {
            title: 'Too many requests',
            body: 'Please try again after few seconds',
          },
          {
            enableClose: false,
          }
        );
      })
    );
  }
}
