import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-about-private-solutions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-4xl text-center">Private Solutions</h2>
    <div class="text-sm text-center mt-4">
      <p>
        With private solutions you can control exactly who sees your solutions.
        If you make your solution private it won't show up on the solutions page
        or on your profile. We'll also make it so that search engines don't
        index the page.
      </p>
      <p class="mt-2">
        But anyone you share your solution URL with will still be able to view
        it.
      </p>
    </div>
  `,
  styles: [
    `
      :host {
        @apply p-8 pt-12;
      }
    `,
  ],
})
export class AboutPrivateSolutionsComponent {}
