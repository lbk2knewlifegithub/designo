import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../../../shared';
import { ChallengesFacade } from '../../../state';

@Component({
  selector: 'lbk-challenges-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenges-page.component.html',
})
export class ChallengesPageComponent implements OnInit {
  challenges$!: Observable<Challenge[]>;

  constructor(private readonly _challengesFacade: ChallengesFacade) {}

  ngOnInit(): void {
    this.challenges$ = this._challengesFacade.challenges$;
    this._challengesFacade.loadChallenges();
  }
}
