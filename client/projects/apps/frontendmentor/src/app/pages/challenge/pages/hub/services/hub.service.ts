import { API_URL } from '@lbk/tokens';
import { Solution, CreateSolutionDTO } from '@lbk/fm/shared';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HubService {
  constructor(
    private readonly _http: HttpClient,
    @Inject(API_URL)
    private readonly _apiURL: string
  ) {}

  /**
   * - Load Solutions For Challenge
   * @param id
   * @returns
   */
  loadSolutionsForChallange(id: string): Observable<Solution[]> {
    return this._http.get<Solution[]>(
      `${this._apiURL}/frontendmentor/solutions/${id}/challenge`
    );
  }

  /**
   * - Create Solution
   * @param challengeID
   * @param dto
   * @returns
   */
  createSolution(
    challengeID: string,
    dto: CreateSolutionDTO
  ): Observable<void> {
    return this._http.post<void>(`${this._apiURL}/frontendmentor/solution/`, {
      challengeID,
      ...dto,
    });
  }
}
