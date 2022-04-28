import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../shared';
import { ChallengesService } from './challenges.service';

@Injectable({ providedIn: 'root' })
export class ChallengesFakeService implements ChallengesService {
  constructor(private readonly _http: HttpClient) {}
  /**
   * - Get All Challenges
   */
  getAllChallenges(): Observable<Challenge[]> {
    return this._http.get<Challenge[]>('/assets/data/challenges.json');
  }
}
