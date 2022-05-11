import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Challenge } from '@lbk/fm/shared';

@Component({
  selector: 'lbk-challenge-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenge-details.component.html',
})
export class ChallengeDetailsComponent {
  @Input() challenge!: Challenge;
}
