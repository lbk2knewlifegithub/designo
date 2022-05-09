import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex justify-between">
      <h3 class="font-bold tracking-widest text-lg md:text-base">DIFFICULTY</h3>

      <div>
        <lbk-difficulty difficulty="junior"></lbk-difficulty>
      </div>
    </div>

    <div class="mt-3 md:mt-4">
      <h4 class="font-bold tracking-widest">STATS</h4>
      <ul>
        <!-- Started -->
        <li>
          <strong> 3,085 </strong>
          <span> people have started this challenge </span>
        </li>
        <!-- end Started -->

        <!-- Completed -->
        <li>
          <strong> 197 </strong>
          <span> people have completed this challenge </span>
        </li>
        <!-- end Completed -->
      </ul>
    </div>
  `,
  styles: [
    `
      :host {
        @apply bg-secondary-50 p-6 rounded-lg;

        ul {
          @apply grid mt-2 gap-2 md:mt-8 md:gap-6;
          li {
            @apply flex items-center justify-between;

            strong {
              @apply grow text-4xl mr-10 md:text-5xl;
            }
            span {
              @apply text-xs text-right;
            }
          }
        }
      }
    `,
  ],
})
export class StatsComponent {}
