import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Challenge } from './../../shared';
import { ChallengesFacade } from './../../state';

@Injectable({ providedIn: 'root' })
export class ChallengesResolver implements Resolve<Challenge[]> {
  constructor(private readonly _challengesFacade: ChallengesFacade) {}

  resolve(): Observable<Challenge[]> {
    this._challengesFacade.loadChallenges();
    return this._challengesFacade.processedChallenges$.pipe(take(1));
  }
}
