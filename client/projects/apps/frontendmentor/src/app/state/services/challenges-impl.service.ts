import { API_URL } from '@lbk/tokens';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../shared';
import { ChallengesService } from './challenges.service';

@Injectable({ providedIn: 'root' })
export class ChallengesImplService implements ChallengesService {
  constructor(
    private readonly _http: HttpClient,
    @Inject(API_URL)
    private readonly _api: string
  ) {}
  /**
   * - Get All Challenges
   */
  getAllChallenges(): Observable<Challenge[]> {
    return this._http.get<Challenge[]>(
      `${this._api}/frontendmentor/challenges`
    );
  }

  /**
   * - Retrieve a Challenge
   * @param challenge_id
   */
  retrieveChallenge(id: string): Observable<Challenge> {
    return this._http.get<Challenge>(
      `${this._api}/frontendmentor/challenge/${id}`
    );
  }
}
