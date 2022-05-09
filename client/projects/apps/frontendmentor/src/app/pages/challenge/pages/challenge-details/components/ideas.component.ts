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

    <markdown scrollTo="center" class="ideas markdown-body block mt-4">
      {{ ideas }}
    </markdown>
  `,
  styles: [
    `
      .ideas.markdown-body {
        @apply mt-4;
        ul {
          @apply grid gap-2 text-sm list-disc lg:text-base lg:mt-6;
        }
      }
    `,
  ],
})
export class IdeasComponent {
  @Input() ideas!: string;
}
