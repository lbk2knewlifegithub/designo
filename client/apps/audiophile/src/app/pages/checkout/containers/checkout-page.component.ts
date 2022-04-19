import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '../../../shared';
import { CartFacade } from '../../../state';

@Component({
  selector: 'lbk-checkout-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mb-[98px] 2xl:mb-[1r0px]">
      <div class="container">
        <!-- Go Back Button -->
        <lbk-back class="block mt-4 sm:mt-8 2xl:mt-20"></lbk-back>
        <!-- end Go Back Button -->

        <div class="mt-6 grid gap-8 2xl:grid-cols-3 2xl:mt-10 2xl:gap-[30px]">
          <!-- @fadeInLeftOnEnter -->
          <lbk-checkout-form
            [form]="form"
            class="2xl:col-span-2"
          ></lbk-checkout-form>

          <!-- @fadeInRightOnEnter -->
          <lbk-summary
            [disabled]="form.invalid"
            [items]="(items$ | async)!"
            (checkout)="checkout()"
            class="2xl:col-span-1"
          ></lbk-summary>
        </div>
      </div>
    </main>
  `,
  animations: [
    // fadeInLeftOnEnterAnimation(), fadeInRightOnEnterAnimation()
  ],
})
export class CheckoutPageComponent implements OnInit {
  items$!: Observable<Item[]>;

  form!: FormGroup;

  constructor(
    private readonly _cartFacade: CartFacade,
    private readonly _fb: FormBuilder
  ) {}

  get isDirty(): boolean {
    return this.form.dirty;
  }

  ngOnInit(): void {
    this.items$ = this._cartFacade.items$;
    this.form = this._initForm();
  }

  checkout() {
    const { billingDetails, shippingInfo, payment } = this.form.value;
    this._cartFacade.checkout(billingDetails, shippingInfo, payment);
    this.form.reset({});
  }

  private _initForm() {
    return this._fb.group({
      billingDetails: this._fb.group({
        name: ['Banana', [Validators.required]],
        email: ['banana@gmail.com', [Validators.required, Validators.email]],
        phoneNumber: [
          '3242342323',
          [
            Validators.required,
            Validators.maxLength(12),
            Validators.minLength(10),
          ],
        ],
      }),
      shippingInfo: this._fb.group({
        address: ['121 banana', Validators.required],
        zipCode: [
          '323432',
          [
            Validators.required,
            Validators.maxLength(6),
            Validators.minLength(6),
          ],
        ],
        country: ['abc', [Validators.required, Validators.maxLength(30)]],
      }),
      payment: [
        {
          eMoney: { accountNumber: '111122223333444', pin: '1234' },
          cashOnDelivery: false,
        },
      ],
    });
  }
}
