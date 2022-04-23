import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../shared';
import { ChallengesService } from './challenges.service';

@Injectable({ providedIn: 'root' })
export class ChallengesImplService implements ChallengesService {
  getAllChallenges(): Observable<Challenge[]> {
    throw new Error('Method not implemented.');
  }
}
