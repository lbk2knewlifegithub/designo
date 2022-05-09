import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OtherProduct } from '../../../../shared';

@Component({
  selector: 'lbk-other-product-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h3 class="uppercase font-bold text-xl text-center md:text-3xl">
        You May also like
      </h3>

      <div
        class="grid mt-10 gap-14 md:mt-14 md:grid-cols-3 md:gap-3 2xl:mt-16 2xl:gap-[30px]"
      >
        <ng-container
          *ngFor="
            let otherProduct of othersProduct;
            trackBy: identifyOtherProduct
          "
        >
          <lbk-other-product-preview
            [otherProduct]="otherProduct"
          ></lbk-other-product-preview>
        </ng-container>
      </div>
    </section>
  `,
})
export class OtherProductPreviewListComponent {
  @Input() othersProduct!: OtherProduct[];

  identifyOtherProduct(index: number, otherProduct: OtherProduct) {
    return otherProduct.slug;
  }
}
