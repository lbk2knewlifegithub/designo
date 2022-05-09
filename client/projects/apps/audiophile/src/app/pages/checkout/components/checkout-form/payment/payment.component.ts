import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Unsubscriber } from '@lbk/comps';

const PAYMENT_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaymentComponent),
  multi: true,
};

@Component({
  selector: 'lbk-payment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PAYMENT_ACCESSOR],
  template: `
    <div>
      <h6 class="font-bold text-xs text-primary-900 uppercase">
        Payment details
      </h6>

      <lbk-payment-method
        class="block mt-4"
        (eMoney)="onEMoney()"
        (cashOnDelivery)="onCashOnDelivery()"
        [isEMoney]="isEMoney"
        [isCashOnDelivery]="isCashOnDelivery"
      ></lbk-payment-method>

      <div class="block mt-8 md:mt-6">
        <lbk-e-money-form
          [parent]="payment"
          *ngIf="isEMoney; else cashOnDelivery"
        ></lbk-e-money-form>

        <ng-template #cashOnDelivery>
          <lbk-cash-on-delivery></lbk-cash-on-delivery>
        </ng-template>
      </div>
    </div>
  `,
})
export class PaymentComponent
  extends Unsubscriber
  implements ControlValueAccessor, OnInit
{
  payment!: FormGroup;
  onTouched!: () => void;

  constructor(private readonly _fb: FormBuilder) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();
    this.payment = this._fb.group({
      eMoney: this._fb.group({
        accountNumber: [
          '',
          [
            Validators.required,
            Validators.maxLength(16),
            Validators.minLength(16),
          ],
        ],
        pin: [
          '',
          [
            Validators.required,
            Validators.maxLength(4),
            Validators.minLength(4),
          ],
        ],
      }),
      cashOnDelivery: false,
    });
  }

  writeValue(obj: any): void {
    if (!obj) return;
    this.payment.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.appendSub = this.payment.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  get cashOnDelivery(): FormControl {
    return this.payment.controls['cashOnDelivery'] as FormControl;
  }

  get isCashOnDelivery(): boolean {
    return this.cashOnDelivery.value;
  }

  get isEMoney() {
    return !this.isCashOnDelivery;
  }

  onCashOnDelivery() {
    this.cashOnDelivery.setValue(true);
    this.onTouched();
  }

  onEMoney() {
    this.cashOnDelivery.setValue(false);
    this.onTouched();
  }
}
