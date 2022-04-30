import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-unlock-solution',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="font-medium text-3xl">Just to confirm...</h1>

    <p class="mt-5">
      You’ve got <strong>1,300 points</strong> at the moment. After unlocking
      the solutions to this challenge early you’ll have <strong>1,250</strong>.
    </p>

    <div class="mt-4">
      <button class="btn btn-error italic font-bold tracking-widest px-10">
        SPEND 50 POINTS
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        @apply text-center grid place-items-center pt-16 px-8;
      }
    `,
  ],
})
export class UnlockSolutionComponent {}
