import { Observable } from 'rxjs';
import { Challenge } from '../../shared';

export interface ChallengesService {
  /**
   * - Get All Challenges
   */
  getAllChallenges(): Observable<Challenge[]>;

  /**
   * - Retrieve a Challenge
   */
  retrieveChallenge(challenge_id: number): Observable<Challenge>;
}
