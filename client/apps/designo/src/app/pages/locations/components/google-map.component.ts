import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { GOOGLE_MAP } from '@lbk/tokens';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

@Component({
  selector: 'lbk-google-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-full overflow-hidden">
      <google-map [options]="options" *ngIf="apiLoaded$ | async"></google-map>
    </div>
  `,
})
export class GoogleMapComponent implements OnInit {
  apiLoaded$!: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: 40, lng: -20 },
    zoom: 4,
  };

  constructor(
    private readonly _httpClient: HttpClient,
    @Inject(GOOGLE_MAP)
    private readonly _googleMapToken: string
  ) {}
  ngOnInit(): void {
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
