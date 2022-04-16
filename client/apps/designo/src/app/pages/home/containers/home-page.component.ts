import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="relative">
      <!-- Hero -->
      <lbk-hero></lbk-hero>
      <!-- end Hero -->

      <!-- Projects -->
      <lbk-projects class="block mt-[120px]"></lbk-projects>
      <!-- end Projects -->

      <!-- Features -->
      <lbk-features class="block mt-[120px]"></lbk-features>
      <!-- end Features -->

      <!-- Let Talks -->
      <lbk-let-talks
        class="absolute block w-full bottom-0 left-1/2 translate-y-1/2  -translate-x-1/2"
        scrollTo
      ></lbk-let-talks>
      <!-- end Let Talks -->
    </main>
  `,
})
export class HomePageComponent {}
