import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-learn-about-wall-of-fame',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './learn-about-wall-of-fame.component.html',
  styles: [
    `
      :host {
        @apply p-8 overflow-y-scroll;
      }

      .points {
        li {
          @apply flex gap-4 items-center justify-between;
          div {
            @apply flex items-center gap-4;
            span {
              @apply text-center min-w-[48px] min-h-[48px] rounded-full text-white text-xs font-bold  grid place-content-center;
            }
          }
        }
      }
    `,
  ],
})
export class LearnAboutChallengeComponent {}
