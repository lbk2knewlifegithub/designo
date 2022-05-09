import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Challenge, identifyChallenge } from './../../../shared';

@Component({
  selector: 'lbk-challenge-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <ul class="grid gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3">
        <li *ngFor="let challenge of challenges; trackBy: identifyChallenge">
          <lbk-challenge-preview
            [challenge]="challenge"
          ></lbk-challenge-preview>
        </li>
      </ul>
    </section>
  `,
})
export class ChallengeListComponent {
  @Input() challenges!: Challenge[];
  identifyChallenge = identifyChallenge;
}
