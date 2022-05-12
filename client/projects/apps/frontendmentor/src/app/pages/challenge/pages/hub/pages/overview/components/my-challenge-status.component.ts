import { Component, Input } from '@angular/core';
import { Challenge } from '@lbk/fm/shared';

@Component({
  selector: 'lbk-my-challenge-status',
  template: `
    <div>
      <span class="text-sm md:text-base">Status</span>
      <h2 class="text-warning-50 font-bold text-2xl md:text-3xl">
        {{ challenge.status | titlecase }}
      </h2>
    </div>

    <ul class="grow flex justify-evenly gap-2 text-sm md:text-base">
      <li class="grid gap-2">
        Likes
        <lbk-hyphen [value]="challenge.likes"></lbk-hyphen>
      </li>
      <li class="grid gap-2">
        Bookmarks
        <lbk-hyphen [value]="challenge.bookmarks"></lbk-hyphen>
      </li>
      <li class="grid gap-2">
        Comments
        <lbk-hyphen [value]="challenge.comments"></lbk-hyphen>
      </li>
    </ul>
  `,
  styles: [
    `
      :host {
        @apply flex justify-between py-4 border-y;
      }
    `,
  ],
})
export class MyChallengeStatusComponent {
  @Input() challenge!: Challenge;
}
