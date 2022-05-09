import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { Product } from '../../../shared';
import { CartFacade } from '../../../state';

@Component({
  selector: 'lbk-product-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mb-[120px] 2xl:mb-[160px]">
      <div class="container flow-root">
        <!-- go back -->
        <lbk-back class="block mt-4 sm:mt-8 2xl:mt-20"></lbk-back>
        <!-- end go back -->

        <div *ngIf="product$ | async as product" class="block mt-6 2xl:mt-14">
          <lbk-product-detail
            (addToCart)="addToCart($event)"
            [product]="product"
          ></lbk-product-detail>

          <lbk-other-product-preview-list
            class="block mt-[120px] 2xl:mt-[160px]"
            [othersProduct]="product.others"
          ></lbk-other-product-preview-list>
        </div>

        <!-- category preview list -->
        <lbk-category-preview-list
          class="block mt-44 2xl:mt-60"
        ></lbk-category-preview-list>
        <!-- end category preview list -->

        <!-- bring to the best -->
        <lbk-the-best class="block mt-[120px] 2xl:mt-[160px]"></lbk-the-best>
        <!-- end bring to the best -->
      </div>
    </main>
  `,
})
export class ProductDetailPageComponent implements OnInit {
  product$!: Observable<Product>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _cartFacade: CartFacade
  ) {}

  ngOnInit(): void {
    this.product$ = this._route.data.pipe(pluck('product'));
  }

  /**
   * - Add To Cart
   * @param toCart
   */
  addToCart(toCart: { quantity: number; product: Product }) {
    this._cartFacade.addToCart(toCart);
  }
}
