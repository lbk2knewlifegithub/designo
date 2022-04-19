import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { Item } from '../../models';

@Component({
  selector: 'lbk-order-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 rounded-lg md:p-12 md:min-w-[540px]">
      <!-- Checked Icon -->
      <div
        class="w-16 h-16 bg-primary-900 rounded-full grid place-content-center"
      >
        <span class="fa fa-check text-white text-3xl"></span>
      </div>
      <!-- end Checked Icon -->

      <h2 class="font-bold text-xl mt-6 md:text-2xl">
        THANK YOU <br />
        FOR YOUR ORDER
      </h2>

      <p class="font-medium text-gray-500 mt-4 md:mt-6">
        You will receive an email confirmation shortly.
      </p>

      <div class="mt-6 grid rounded-lg overflow-hidden md:mt-6 md:grid-cols-5">
        <!-- items -->
        <lbk-order-item-list
          class="md:col-span-3"
          [items]="items"
          [display]="display"
          (onRest)="onRest()"
        ></lbk-order-item-list>
        <!-- end items -->

        <!-- grand total -->
        <lbk-grand-total-order-success
          [placeEnd]="isPlaceGrandTotalEnd"
          class="md:col-span-2"
          [grandTotal]="items | grandTotal"
        ></lbk-grand-total-order-success>
      </div>

      <!-- back to home -->
      <a
        routerLink="/"
        (click)="close()"
        class="btn btn-primary w-full mt-6 md:mt-12"
      >
        Back to home
      </a>
      <!-- end back to home -->
    </div>
  `,
})
export class OrderSuccessComponent implements OnInit {
  display = 1;
  items!: Item[];

  constructor(
    @Inject(DialogRef)
    private readonly _ref: DialogRef
  ) {}

  ngOnInit(): void {
    this.items = this._ref.data;
  }

  onRest() {
    if (this.display == this.items.length) {
      this.display = 1;
      return;
    }

    this.display = this.items.length;
  }

  get isPlaceGrandTotalEnd() {
    return this.display > 1;
  }

  close() {
    this._ref.close();
  }
}
