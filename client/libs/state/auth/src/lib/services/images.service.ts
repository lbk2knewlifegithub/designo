import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_IMAGES_URL } from '@lbk/tokens';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  constructor(
    @Inject(API_IMAGES_URL)
    private readonly _apiImagesUrl: string,
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
