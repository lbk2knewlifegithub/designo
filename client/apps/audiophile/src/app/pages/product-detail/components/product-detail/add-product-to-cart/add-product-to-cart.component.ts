import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { identifyImage } from '@lbk/models';
import { Product } from '../../../../../shared';

@Component({
  selector: 'lbk-add-product-to-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-8 md:grid-cols-2 md:gap-[70px] 2xl:gap-[125px]">
      <ng-container *ngFor="let image of [product.image]">
        <lbk-image
          class="block overflow-hidden rounded-lg"
          [image]="product.image"
        >
        </lbk-image>
      </ng-container>

      <div class="md:grid md:place-content-center">
        <lbk-product-info [product]="product"></lbk-product-info>

        <div class="flex gap-4 mt-8">
          <!-- quantity -->
          <lbk-quantity [min]="1" [(quantity)]="quantity"></lbk-quantity>
          <!-- end quantity -->

          <!-- add to cart -->
          <button
            [disabled]="quantity < 1"
            (click)="onAddToCart()"
            class="btn btn-primary max-h-[48px]"
          >
            Add to cart
          </button>
          <!-- end add to cart -->
        </div>
      </div>
    </div>
  `,
  animations: [
    // fadeInLeftOnEnterAnimation(), fadeInRightOnEnterAnimation()
  ],
})
export class AddProductToCartComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<number>();
  identifyImage = identifyImage;

  quantity = 1;

  get isNew(): boolean {
    return this.product.new;
  }
  onAddToCart() {
    this.addToCart.emit(this.quantity);
    this.quantity = 1;
  }
}
