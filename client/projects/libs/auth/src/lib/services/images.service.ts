import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@lbk/tokens';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  private readonly _apiImagesUrl = `${this._apiUrl}/images`;
  constructor(
    @Inject(API_URL)
    private readonly _apiUrl: string,
    private _http: HttpClient
  ) {}

  uploadAvatar(formData: FormData, accessToken?: string): Observable<string> {
    return this._http.put<string>(
      `${this._apiImagesUrl}/upload/avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
