import { Observable } from 'rxjs';
import { Challenge } from '../../shared';

export interface ChallengesService {
  /**
   * - Get All Challenges
   */
  getAllChallenges(): Observable<Challenge[]>;
}
