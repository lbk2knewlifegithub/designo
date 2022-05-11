import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'lbk-ideas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <!-- Title -->
    <h2 class="text-dark font-bold text-2xl lg:text-3xl">
      Ideas to test yourself
    </h2>
    <!-- end Title -->

    <markdown class="ideas markdown-body block mt-4">
      {{ ideas }}
    </markdown>
  `,
  styles: [
    `
      .ideas.markdown-body {
        @apply mt-4 bg-transparent;
        ul {
          @apply text-sm list-disc lg:mt-6;
        }
      }
    `,
  ],
})
export class IdeasComponent {
  @Input() ideas!: string;
}
