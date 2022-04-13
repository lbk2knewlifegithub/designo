import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '@lbk/services';
import { Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly _tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._tokenService.getToken().pipe(
      switchMap((token) => {
        const headers = req.headers.set(
          'Authorization',
          `Bearer ${token?.accessToken}`
        );
        return next.handle(req.clone({ headers }));
      })
    );
  }
}
