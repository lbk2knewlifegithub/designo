import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-shop-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="['/category', categoryName]"
      class="inline-flex gap-3 items-center text-center group"
    >
      <span
        class="duration-500 font-bold text-xs text-gray-500 group-hover:text-primary-900"
        >SHOP</span
      >
      <span>
        <img
          class="w-[5px] h-[10px]"
          src="/assets/shared/desktop/icon-arrow-right.svg"
          alt="Arrow right"
        />
      </span>
    </a>
  `,
})
export class ShopButtonComponent {
  @Input() categoryName!: string;
}
