import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="relative">
      <!-- Hero -->
      <lbk-hero></lbk-hero>
      <!-- end Hero -->

      <!-- Projects Link-->
      <lbk-project-links
        data-aos="fade-up"
        class="block mt-[120px] 2xl:mt-[160px]"
      ></lbk-project-links>
      <!-- end Projects Link-->

      <!-- Features -->
      <lbk-features
        data-aos="fade-up"
        class="block mt-[120px] 2xl:mt-[160px]"
      ></lbk-features>
      <!-- end Features -->
    </main>
  `,
})
export class HomePageComponent {}
