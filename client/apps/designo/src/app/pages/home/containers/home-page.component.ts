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
      <lbk-projects class="block mt-[120px] 2xl:mt-[160px]"></lbk-projects>
      <!-- end Projects -->

      <!-- Features -->
      <lbk-features class="block mt-[120px] 2xl:mt-[160px]"></lbk-features>
      <!-- end Features -->
    </main>
  `,
})
export class HomePageComponent {}
