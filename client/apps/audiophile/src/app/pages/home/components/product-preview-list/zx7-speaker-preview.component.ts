import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-normal-speaker-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative rounded-lg max-h-[320px] overflow-hidden">
      <lbk-image classImage="w-full" [image]="image"></lbk-image>

      <div
        class="absolute top-1/2 -translate-y-1/2  left-6 space-y-6 md:space-y-8 md:left-16 2xl:left-[95px]"
      >
        <h2 class="uppercase text-2xl font-bold">zx7 speaker</h2>

        <a class="btn btn-outline" routerLink="/product/zx7-speaker"
          >See product</a
        >
      </div>
    </div>
  `,
})
export class ZX7SpeakerPreviewComponent {
  image: Image = {
    mobile: 'assets/home/mobile/image-speaker-zx7.jpg',
    tablet: 'assets/home/tablet/image-speaker-zx7.jpg',
    desktop: 'assets/home/desktop/image-speaker-zx7.jpg',
    alt: 'ZX7 speaker',
  };
}
