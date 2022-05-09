import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-cart-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      aria-label="Shopping Cart"
      class="relative inline-block"
      (click)="cart.emit()"
    >
      <!-- Cart Icon -->
      <span
        [class.text-primary-900]="open"
        id="cartButton"
        class="fas fa-shopping-cart text-white text-xl duration-500 hover:text-primary-900"
      ></span>
      <!-- end Cart Icon -->

      <!-- Number Of Items -->
      <span
        *ngIf="numberOfItems > 0"
        class="absolute -translate-y-1/2 translate-x-1/2 top-0 right-0 badge-primary "
        >{{ numberOfItems }}</span
      >
      <!-- end Number Of Items -->
    </button>
  `,
})
export class CartButtonComponent {
  @Output() cart = new EventEmitter<void>();
  @Input() numberOfItems!: number;
  @Input() open!: boolean;
}
