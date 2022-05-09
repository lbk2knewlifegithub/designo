import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-earphones-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="grid gap-6 overflow-hidden md:max-h-80  md:grid-cols-2 md:gap-[11px] 2xl:gap-[30px]"
    >
      <lbk-image
        class="rounded-lg overflow-hidden"
        classImage="w-full"
        [image]="image"
      ></lbk-image>

      <div
        class="space-y-8 bg-muted-900 px-6 py-10 rounded-lg md:py-[100px] md:pl-10 2xl:pl-[95px]"
      >
        <h2 class="font-bold text-2xl uppercase">yx1 earphones</h2>

        <div>
          <a class="btn btn-outline" routerLink="/product/yx1-earphones"
            >see product</a
          >
        </div>
      </div>
    </div>
  `,
})
export class EarphonesPreviewComponent {
  image: Image = {
    mobile: 'assets/home/mobile/image-earphones-yx1.jpg',
    tablet: 'assets/home/tablet/image-earphones-yx1.jpg',
    desktop: 'assets/home/desktop/image-earphones-yx1.jpg',
    alt: 'YX1 earphones',
  };
}
