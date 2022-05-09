import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Challenge } from '../../models';

@Component({
  selector: 'lbk-challenge-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenge-preview.component.html',
  styles: [
    `
      :host {
        @apply overflow-hidden max-w-[395px] rounded-lg;
        @apply block h-full relative shadow-md;
      }
    `,
  ],
})
export class ChallengePreviewComponent {
  @Input() challenge!: Challenge;
}
