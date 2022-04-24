import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenge, fromData } from '../../shared';
import { ChallengesService } from './challenges.service';

@Injectable({ providedIn: 'root' })
export class ChallengesFakeService implements ChallengesService {
  /**
   * - Get All Challenges
   */
  getAllChallenges(): Observable<Challenge[]> {
    return of(fromData.challenges);
  }
}
