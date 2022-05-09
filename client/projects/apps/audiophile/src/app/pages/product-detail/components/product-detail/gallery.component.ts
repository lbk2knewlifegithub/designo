import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Image } from '@lbk/models';
import { Gallery } from '../../../../shared';

@Component({
  selector: 'lbk-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="grid gap-5 md:grid-cols-5 md:grid-rows-2 md:gap-x-[18px] 2xl:gap-x-[30] 2xl:gap-y-8"
    >
      <!-- first  -->
      <lbk-image
        class="md:col-span-2"
        [image]="first"
        classImage="rounded-lg"
      ></lbk-image>
      <!-- end first -->

      <!-- second  -->
      <lbk-image
        class="md:row-start-2 md:col-span-2 "
        [image]="second"
        classImage="rounded-lg"
      ></lbk-image>
      <!-- end second -->

      <!-- third  -->
      <lbk-image
        class="md:col-span-3 md:row-span-2"
        classImage="rounded-lg"
        [image]="third"
      ></lbk-image>
      <!-- end third -->
    </div>
  `,
  styles: [
    `
      lbk-responsive-image {
        @apply block rounded-lg overflow-hidden;
      }
    `,
  ],
})
export class GalleryComponent {
  @Input() gallery!: Gallery;

  identifyImage(index: number, image: Image) {
    return image.desktop;
  }

  get first(): Image {
    return this.gallery.first;
  }

  get second(): Image {
    return this.gallery.second;
  }

  get third(): Image {
    return this.gallery.third;
  }
}
