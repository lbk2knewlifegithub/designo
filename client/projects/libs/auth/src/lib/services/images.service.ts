import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@lbk/tokens';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string,
    private _http: HttpClient
  ) {}

  uploadAvatar(formData: FormData, accessToken?: string): Observable<string> {
    return this._http
      .put<{ avatar: string }>(`${this._apiUrl}/upload/avatar`, formData)
      .pipe(
        map(({ avatar }) => avatar),
        shareReplay(1)
      );
  }
}
