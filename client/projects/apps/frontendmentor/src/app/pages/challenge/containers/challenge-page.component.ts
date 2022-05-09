import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-challenge-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
})
export class ChallengePageComponent {}
