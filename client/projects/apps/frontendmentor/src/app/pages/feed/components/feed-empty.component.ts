import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lbk-feed-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="text-center px-10 pt-16 pb-20 bg-secondary-50 rounded-lg md:pt-24 md:pb-32 md:px-32"
    >
      <h1 class="font-bold text-xl">Your feed is empty right now.</h1>

      <div class="text-sm space-y-2 mt-3 w-full">
        <p>Follow other users to see their activity here.</p>
        <p>The Wall of Fame showcases our most active community members.</p>
      </div>

      <div class="mt-10">
        <a
          class="btn btn-error w-full px-10 italic tracking-widest font-bold "
          routerLink="/shell/wall-of-fame"
        >
          VISIT THE WALL OF FAME
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        @apply block bg-white p-10 rounded-xl;
      }
    `,
  ],
})
export class FeedEmptyComponent {}
