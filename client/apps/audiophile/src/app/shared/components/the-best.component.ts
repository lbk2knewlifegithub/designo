import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ImageModule } from '@lbk/comps';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-the-best',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="grid gap-10 place-items-center md:gap-16 2xl:grid-cols-2 2xl:gap-[125px]"
    >
      <lbk-image
        class="w-full h-full rounded-lg overflow-hidden 2xl:order-last"
        [image]="image"
        classImage="h-full w-full"
      ></lbk-image>

      <!-- Content -->
      <div class="space-y-8 text-center max-w-[578px] 2xl:text-left">
        <h2 class="text-2xl font-bold uppercase md:text-4xl">
          Bringing you the
          <strong class="text-primary-900">best</strong> audio gear
        </h2>
        <p class="text-gray-400 font-medium">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <!-- end Content -->
    </section>
  `,
})
export class TheBestComponent {
  image: Image = {
    mobile: 'assets/shared/mobile/image-best-gear.jpg',
    tablet: 'assets/shared/tablet/image-best-gear.jpg',
    desktop: 'assets/shared/desktop/image-best-gear.jpg',
    alt: 'Best Gear',
  };
}

@NgModule({
  imports: [
    // Shared Components from Libs
    ImageModule,
  ],
  exports: [TheBestComponent],
  declarations: [TheBestComponent],
})
export class TheBestModule {}
