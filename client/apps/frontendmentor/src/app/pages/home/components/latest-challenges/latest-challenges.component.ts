import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Challenge, identifyChallenge } from './../../../../shared';

@Component({
  selector: 'lbk-latest-challenges',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './latest-challenges.component.html',
})
export class LatestChallengesComponent {
  @Input() challenges!: Challenge[];
  identifyChallenge = identifyChallenge;
}
