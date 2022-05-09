import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../../../../shared';
import { combineLatest, map, Observable, of } from 'rxjs';

@Component({
  selector: 'lbk-product-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="grid gap-[120px] 2xl:gap-40">
      <ng-container
        *ngFor="let product of products; trackBy: identifyProduct; index as i"
      >
        <lbk-product-preview
          [rtl]="(rtl(i) | async)!"
          [product]="product"
        ></lbk-product-preview>
      </ng-container>
    </section>
  `,
})
export class ProductPreviewListComponent implements OnInit {
  @Input() products!: Product[];
  breakpoint$!: Observable<BreakpointState>;

  constructor(private readonly _breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
    this.breakpoint$ = this._breakpointObserver.observe('(min-width: 1280px)');
  }

  identifyProduct(index: number, product: Product) {
    return product.id;
  }

  rtl(index: number): Observable<boolean> {
    return combineLatest([this.breakpoint$, of(index % 2 === 0)]).pipe(
      map(([breakpoint, even]) => breakpoint.matches && even)
    );
  }
}
