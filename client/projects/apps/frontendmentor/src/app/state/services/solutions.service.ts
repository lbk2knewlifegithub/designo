import { shareReplay } from 'rxjs/operators';
import { Solution } from '../../shared';
import { API_URL } from '@lbk/tokens';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SolutionsService {
  constructor(
    private readonly _http: HttpClient,
    @Inject(API_URL)
    private readonly _api: string
  ) {}

  /**
   * - Get Solutions
   */
  getSolutions(): Observable<Solution[]> {
    return this._http
      .get<Solution[]>(`${this._api}/frontendmentor/solutions`)
      .pipe(shareReplay(1));
  }

  /**
   * - Retrieve Solution
   */
  retrieveSolution(id: string): Observable<Solution> {
    return this._http
      .get<Solution>(`${this._api}/frontendmentor/solution/${id}`)
      .pipe(shareReplay(1));
  }
}
