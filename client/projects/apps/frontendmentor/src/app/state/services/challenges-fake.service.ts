import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { Challenge } from '../../shared';
import { ChallengesService } from './challenges.service';

@Injectable({ providedIn: 'root' })
export class ChallengesFakeService implements ChallengesService {
  constructor(private readonly _http: HttpClient) {}
  startChallenge(id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  /**
   * - Get All Challenges
   */
  getAllChallenges(): Observable<Challenge[]> {
    return this._http
      .get<Challenge[]>('/assets/data/challenges.json')
      .pipe(shareReplay(1));
  }

  /**
   * - Retrieve a Challenge
   * @param id
   * @returns
   */
  retrieveChallenge(id: string): Observable<Challenge> {
    return this._http.get<Challenge[]>('/assets/data/challenges.json').pipe(
      map((challenges) => {
        const challenge = challenges.find((challenge) => challenge.id === id);
        if (!challenge) throw Error('Challenge not found');
        return challenge;
      }),
      shareReplay(1)
    );
  }
}
