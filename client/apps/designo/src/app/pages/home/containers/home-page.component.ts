import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInUp } from '@lbk/anims';

@Component({
  selector: 'lbk-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main @fadeInUp class="relative">
      <!-- Hero -->
      <lbk-hero></lbk-hero>
      <!-- end Hero -->

      <!-- Projects Link-->
      <lbk-project-links
        class="block mt-[120px] 2xl:mt-[160px]"
      ></lbk-project-links>
      <!-- end Projects Link-->

      <!-- Features -->
      <lbk-features class="block mt-[120px] 2xl:mt-[160px]"></lbk-features>
      <!-- end Features -->
    </main>
  `,
  animations: [fadeInUp()],
})
export class HomePageComponent {}
