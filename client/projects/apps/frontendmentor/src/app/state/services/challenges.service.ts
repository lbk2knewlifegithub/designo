import { Observable, ObservedValueOf } from 'rxjs';
import { Challenge } from '../../shared';

export interface ChallengesService {
  /**
   * - Get All Challenges
   */
  getAllChallenges(): Observable<Challenge[]>;

  /**
   * - Retrieve a Challenge
   */
  retrieveChallenge(id: string): Observable<Challenge>;

  /**
   * - Start a Challenge
   * @param id
   */
  startChallenge(id: string): Observable<void>;
}
