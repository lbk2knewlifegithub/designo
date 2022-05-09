import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-premium-hero-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative z-40">
      <!-- ring one -->
      <lbk-ring
        class="absolute center aspect-square w-[280px] md:w-[472px] z-[-1]"
      ></lbk-ring>
      <!-- ring one -->

      <!-- ring two -->
      <lbk-ring
        class="absolute center aspect-square w-[320px] md:w-[542px] z-[-1]"
      ></lbk-ring>
      <!-- end ring two -->

      <!-- ring tree -->
      <lbk-ring
        class="absolute center aspect-square w-[558px] md:w-[944px] z-[-1]"
      ></lbk-ring>

      <!-- end ring tree -->

      <lbk-image
        class="block max-w-[410px] z-30"
        [image]="image"
        name="ZX9 Speaker"
      ></lbk-image>
    </div>
  `,
})
export class PremiumHeroImageComponent {
  image: Image = {
    mobile: 'assets/home/mobile/image-speaker-zx9.png',
    tablet: 'assets/home/tablet/image-speaker-zx9.png',
    desktop: 'assets/home/desktop/image-speaker-zx9.png',
  };
}
