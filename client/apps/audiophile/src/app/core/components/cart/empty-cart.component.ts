import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-empty-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-lg py-10 ">
      <img
        class="max-w-[64px] mx-auto"
        src="/assets/shared/desktop/empty-cart.png"
        alt="Empty cart"
      />

      <div class="text-center mt-4">
        <p class="font-bold text-primary-900">Your cart is empty</p>
        <p class="font-medium text-gray-400">
          Add something to make me happy:)
        </p>
      </div>
    </div>
  `,
})
export class EmptyCartComponent {}
