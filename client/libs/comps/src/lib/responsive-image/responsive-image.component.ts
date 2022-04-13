import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Image } from '@lbk/models';

@Component({
  selector: 'lbk-responsive-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- mobile image -->
    <img class="md:hidden" [src]="image.mobile" [alt]="image.alt" />
    <!-- end mobile image -->

    <!-- tablet image -->
    <img
      class="hidden md:block xl:hidden"
      [src]="image.tablet"
      [alt]="image.alt"
    />
    <!-- end tablet image -->

    <!-- desktop image -->
    <img class="hidden xl:block" [src]="image.desktop" [alt]="image.alt" />
    <!-- end desktop image -->
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ResponsiveImageComponent {
  @Input() image!: Image;
}
