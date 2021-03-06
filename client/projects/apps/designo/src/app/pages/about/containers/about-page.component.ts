import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInUpBig } from '@lbk/anims';

@Component({
  selector: 'lbk-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main @fadeInUpBig class="relative md:pb-10">
      <!-- About Us  -->
      <lbk-about-us></lbk-about-us>
      <!-- end About Us -->

      <!-- World-class talent  -->
      <lbk-world-class-talent
        class="md:block md:mt-[120px] 2xl:mt-[160px]"
      ></lbk-world-class-talent>
      <!-- end World-class talent  -->

      <!-- Locations -->
      <lbk-locations-link
        class="block mt-[120px] 2xl:mt-[160px]"
      ></lbk-locations-link>
      <!-- end Locations -->

      <!-- The Real Deal -->
      <lbk-the-real-deal class="block mt-[120px] "></lbk-the-real-deal>
      <!-- end The Real Deal -->
    </main>
  `,
  animations: [fadeInUpBig()],
})
export class AboutPageComponent {}
