import { Component } from '@angular/core';

@Component({
  selector: 'lbk-my-challenge-status',
  template: `
    <div>
      <span class="text-sm md:text-base">Status</span>
      <h2 class="text-warning-50 font-bold text-2xl md:text-3xl">
        In Progress
      </h2>
    </div>

    <ul class="grow flex justify-evenly gap-2 text-sm md:text-base">
      <li class="grid gap-2">
        Likes
        <span class="w-3 h-1 bg-dark"></span>
      </li>
      <li class="grid gap-2">
        Bookmarks
        <span class="w-3 h-1 bg-dark"></span>
      </li>
      <li class="grid gap-2">
        Comments
        <span class="w-3 h-1 bg-dark"></span>
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
export class MyChallengeStatusComponent {}
