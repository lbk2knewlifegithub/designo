import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Mobile Image -->
    <img class="md:hidden" [src]="image.mobile" [alt]="image.alt" />
    <!-- end Mobile Image -->

    <!-- Tablet Image -->
    <img
      class="hidden md:block xl:hidden"
      [src]="image.tablet"
      [alt]="image.alt"
    />
    <!-- end Tablet Image -->

    <!-- Desktop Image -->
    <img class="hidden xl:block" [src]="image.desktop" [alt]="image.alt" />
    <!-- end Desktop Image -->
  `,
  styles: [
    `
      img {
        @apply h-full w-full object-cover duration-500 hover:scale-110;
      }
    `,
  ],
})
export class ImageComponent {
  @Input() image!: Image;
}

@NgModule({
  exports: [ImageComponent],
  declarations: [ImageComponent],
})
export class ImageModule {}
