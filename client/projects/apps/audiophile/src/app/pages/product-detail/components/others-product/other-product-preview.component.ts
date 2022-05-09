import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OtherProduct } from '../../../../shared';

@Component({
  selector: 'lbk-other-product-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid place-items-center">
      <!-- image -->
      <lbk-image
        class="block rounded-lg overflow-hidden"
        [image]="otherProduct.image"
      ></lbk-image>
      <!-- end image -->

      <!-- name -->
      <h2 class="font-bold text-xl text-center mt-6 uppercase md:mt-10">
        {{ otherProduct.name }}
      </h2>
      <!-- end name -->

      <!-- see product button -->
      <div class="mt-12 md:mt-8">
        <a
          [routerLink]="['/product', otherProduct.slug]"
          class="btn btn-primary"
          >See product</a
        >
      </div>
      <!-- end see product button -->
    </div>
  `,
})
export class OtherProductPreviewComponent {
  @Input() otherProduct!: OtherProduct;
}
