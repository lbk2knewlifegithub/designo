import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="ball "> {{ index }} </span>
    <ng-content></ng-content>
  `,
  styles: [
    `
      .ball {
        @apply absolute top-0 left-0 translate-x-1/2 -translate-y-1/2;
        @apply grid place-content-center text-white font-black;
        @apply w-12 h-12 rounded-full bg-secondary-200;
      }

      :host {
        @apply block relative bg-secondary-50 rounded-lg;
        @apply pt-10 pl-8 pb-6 pr-8;
      }

      :host-context(.primary) {
        @apply bg-primary text-white;

        .ball {
          @apply bg-primary-50;
        }
      }
    `,
  ],
})
export class CardComponent {
  @Input() index!: string;
}
