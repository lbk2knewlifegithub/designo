import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-comments-amount',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="btn-icon text-neutral-300 font-bold">
      <img src="assets/shared/icon-comments.svg" alt="Comments" />
      {{ amount }}
    </span>
  `,
})
export class CommentsAmountComponent {
  @Input() amount!: number;
}
