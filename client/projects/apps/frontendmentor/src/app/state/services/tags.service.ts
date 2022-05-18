import { Tag } from './../../shared';
import { API_URL } from '@lbk/tokens';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TagsService {
  constructor(
    private readonly _http: HttpClient,
    @Inject(API_URL)
    private readonly _api: string
  ) {}

  /**
   * - Get All Tags
   */
  getAllTags(): Observable<Tag[]> {
    return this._http.get<Tag[]>(`${this._api}/frontendmentor/tags`);
  }
}
