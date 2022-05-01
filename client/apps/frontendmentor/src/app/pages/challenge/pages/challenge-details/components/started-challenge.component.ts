import { Component } from '@angular/core';

@Component({
  selector: 'lbk-stared-challenge',
  template: `
    <img src="assets/images/shared/icon-info.svg" alt="Info Icon" />
    It looks like you’ve already started this challenge.
  `,
  styles: [
    `
      :host {
        @apply flex gap-4 items-center text-sm font-medium text-secondary lg:text-lg;
      }
    `,
  ],
})
export class StaredChallengeComponent {}
