import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Challenge, identifyChallenge } from '../../models';
import { ChallengePreviewModule } from '../challenge-preview/challenge-preview.module';
import { ChallengesFacade } from './../../../state';

@Component({
  selector: 'lbk-latest-challenges',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './latest-challenges.component.html',
})
export class LatestChallengesComponent implements OnInit {
  challenges$!: Observable<Challenge[]>;
  identifyChallenge = identifyChallenge;

  constructor(private readonly _challengesFacade: ChallengesFacade) {}

  ngOnInit(): void {
    this.challenges$ = this._challengesFacade.latestChallenges$;
  }
}

@NgModule({
  imports: [CommonModule, RouterModule, ChallengePreviewModule],
  exports: [LatestChallengesComponent],
  declarations: [LatestChallengesComponent],
})
export class LatestChallengesModule {}
