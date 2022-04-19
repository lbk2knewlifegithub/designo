import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryPreview } from '../../models';

@Component({
  selector: 'lbk-category-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      routerLink="/"
      class="relative bg-muted-900 rounded-lg pt-24 pb-6 text-center grid place-content-center md:pt-[88px] 2xl:pt-[116px]"
    >
      <!-- Category Preview Image -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-3xl"
      >
        <lbk-image class="block" [image]="categoryPreview.image"></lbk-image>
      </div>
      <!-- end Category Preview Image -->

      <div class="space-y-4">
        <!-- Category Preview Name -->
        <h4 class="uppercase font-bold 2xl:text-lg">
          {{ categoryPreview.name }}
        </h4>
        <!-- end Category Preview Name -->

        <!-- Shop Button -->
        <lbk-shop-button
          [categoryName]="categoryPreview.name"
          class="block"
        ></lbk-shop-button>
        <!-- end Shop Button -->
      </div>
    </a>
  `,
})
export class CategoryPreviewComponent {
  @Input() categoryPreview!: CategoryPreview;
}
