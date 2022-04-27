import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Challenge, identifyChallenge } from '../../models';
import { ChallengePreviewModule } from '../challenge-preview/challenge-preview.module';

@Component({
  selector: 'lbk-latest-challenges',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './latest-challenges.component.html',
})
export class LatestChallengesComponent {
  @Input() challenges!: Challenge[];
  identifyChallenge = identifyChallenge;
}

@NgModule({
  imports: [CommonModule, ChallengePreviewModule],
  exports: [LatestChallengesComponent],
  declarations: [LatestChallengesComponent],
})
export class LatestChallengesModule {}
