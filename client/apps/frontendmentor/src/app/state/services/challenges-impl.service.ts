import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../shared';
import { ChallengesService } from './challenges.service';

@Injectable({ providedIn: 'root' })
export class ChallengesImplService implements ChallengesService {
  /**
   * - Get All Challenges
   */
  getAllChallenges(): Observable<Challenge[]> {
    throw new Error('Method not implemented.');
  }

  /**
   * - Retrieve a Challenge
   * @param challenge_id
   */
  retrieveChallenge(challenge_id: number): Observable<Challenge> {
    throw new Error('Method not implemented.');
  }
}
