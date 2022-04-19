import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative container-large">
      <!-- @fadeInOnEnter -->
      <lbk-image [image]="heroImage"></lbk-image>

      <!-- hero content -->
      <div class="absolute inset-0 ">
        <div
          class="container h-full grid grid-cols-2 place-content-center place-items-start 2xl:mt-[18px]"
        >
          <lbk-hero-content
            class="absolute px-6 top-[33%] left-1/2 -translate-x-1/2 md:max-w-md md:top-[28%] 2xl:reset 2xl:max-w-sm "
          ></lbk-hero-content>
        </div>
      </div>
      <!-- end hero content -->
    </section>
  `,
  animations: [
    // fadeInOnEnterAnimation()
  ],
})
export class HeroComponent {
  heroImage: Image = {
    mobile: 'assets/home/mobile/image-header.jpg',
    tablet: 'assets/home/tablet/image-header.jpg',
    desktop: 'assets/home/desktop/image-header.jpg',
    alt: 'Hero Home',
  };
}
