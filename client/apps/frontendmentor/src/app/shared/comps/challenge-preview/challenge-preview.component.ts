import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Challenge } from '../../models';

@Component({
  selector: 'lbk-challenge-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './challenge-preview.component.html',
  styles: [
    `
      :host {
        @apply h-full block relative shadow-md rounded-lg overflow-hidden max-w-[395px];
      }
    `,
  ],
})
export class ChallengePreviewComponent {
  @Input() challenge!: Challenge;
}
