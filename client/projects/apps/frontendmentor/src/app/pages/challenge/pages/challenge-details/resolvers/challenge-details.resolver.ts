import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first, Observable } from 'rxjs';
import { Challenge } from '../../../../../shared';
import { ChallengesFacade } from '../../../../../state';

@Injectable({ providedIn: 'root' })
export class ChallengeDetailsResolver implements Resolve<Challenge> {
  constructor(private readonly _challengesFacade: ChallengesFacade) {}

  resolve(): Observable<Challenge> {
    return this._challengesFacade.selectedChallenge$.pipe(
      first()
    ) as Observable<Challenge>;
  }
}
