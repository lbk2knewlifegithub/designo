import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GOOGLE_MAP } from '@lbk/tokens';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GoogleMapService {
  apiLoaded$!: Observable<boolean>;

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(GOOGLE_MAP)
    private readonly _googleMapToken: string
  ) {
    this.apiLoaded$ = this._httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${this._googleMapToken}`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false)),
        shareReplay(1)
      );
  }
}
