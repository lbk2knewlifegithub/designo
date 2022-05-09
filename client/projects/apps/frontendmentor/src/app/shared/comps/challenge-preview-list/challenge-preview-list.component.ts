import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Challenge, identifyChallenge } from '../../models';

@Component({
  selector: 'lbk-challenge-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3">
      <li *ngFor="let challenge of challenges; trackBy: identifyChallenge">
        <lbk-challenge-preview [challenge]="challenge"></lbk-challenge-preview>
      </li>
    </ul>
  `,
})
export class ChallengePreviewListComponent {
  @Input() challenges!: Challenge[];
  identifyChallenge = identifyChallenge;
}
