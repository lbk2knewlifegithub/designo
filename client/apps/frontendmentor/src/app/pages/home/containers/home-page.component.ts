import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Challenge } from '../../../shared';
import { ChallengesFacade } from '../../../state';

@Component({
  selector: 'lbk-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  latestChallenges$!: Observable<Challenge[]>;

  constructor(private readonly _challengesFacade: ChallengesFacade) {}

  ngOnInit(): void {
    this.latestChallenges$ = this._challengesFacade.challenges$;

    this._challengesFacade.loadChallenges();
  }
}
