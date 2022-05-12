import { Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-stared-challenge',
  template: `
    <div
      class="flex gap-4 items-center text-sm font-medium text-secondary lg:text-lg"
    >
      <img src="assets/images/shared/icon-info.svg" alt="Info Icon" />
      It looks like you’ve already started this challenge.
    </div>

    <!-- Visit Challenge Hub -->
    <div>
      <a
        [routerLink]="['/challenge/hub/' + challengeID + '/overview']"
        class="btn btn-primary italic px-6 font-bold tracking-widest md:px-10"
      >
        VISIT CHALLENGE HUB
      </a>
    </div>
    <!-- end Visit Challenge Hub -->
  `,
  styles: [
    `
      :host {
        @apply flex flex-wrap gap-8 lg:gap-14;
        @apply sm:items-center sm:flex-row sm:justify-between;
      }
    `,
  ],
})
export class StaredChallengeComponent {
  @Input() challengeID!: string;
}
