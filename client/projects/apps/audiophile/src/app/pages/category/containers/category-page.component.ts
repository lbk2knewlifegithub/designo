import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'lbk-category-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="relative mb-[120px] md:mb-[160px]">
      <!-- @fadeInOnEnter -->
      <lbk-category-name [name]="(name$ | async)!"></lbk-category-name>

      <!-- @fadeInUpOnEnter  -->
      <div class="container flow-root">
        <lbk-product-preview-list
          *ngIf="products$ | async as products"
          class="block mt-16 md:mt-[120px] 2xl:mt-40"
          [products]="products"
        ></lbk-product-preview-list>

        <lbk-category-preview-list
          class="block mt-44 2xl:mt-60"
        ></lbk-category-preview-list>

        <lbk-the-best class="block mt-[120px] 2xl:mt-40"></lbk-the-best>
      </div>
    </main>
  `,
  animations: [
    // fadeInOnEnterAnimation(), fadeInUpOnEnterAnimation()
  ],
})
export class CategoryPageComponent implements OnInit {
  name$!: Observable<string>;
  products$!: Observable<Product[]>;

  constructor(private readonly _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.name$ = this._route.params.pipe(pluck('name'));
    this.products$ = this._route.data.pipe(pluck('products'));
  }
}
