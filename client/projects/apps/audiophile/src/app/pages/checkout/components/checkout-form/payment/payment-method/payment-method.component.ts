import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-payment-method',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4 md:grid-cols-2">
      <p class="text-xs font-bold">Payment Method</p>

      <div class="grid gap-4">
        <!-- e money -->
        <lbk-payment-method-input
          (click)="eMoney.emit()"
          [checked]="isEMoney"
          name="e-Money"
        ></lbk-payment-method-input>
        <!-- end e money -->

        <!-- cash on delivery -->
        <lbk-payment-method-input
          (click)="cashOnDelivery.emit()"
          [checked]="isCashOnDelivery"
          name="Crash on Delivery"
        ></lbk-payment-method-input>
        <!-- end cash on delivery -->
      </div>
    </div>
  `,
})
export class PaymentMethodComponent {
  @Input() isEMoney!: boolean;
  @Input() isCashOnDelivery!: boolean;

  @Output() eMoney = new EventEmitter<void>();
  @Output() cashOnDelivery = new EventEmitter<void>();
}
