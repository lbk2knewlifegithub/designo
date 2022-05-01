import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-payment-history-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid gap-6">
      <li
        *ngFor="let i of [1, 2, 3, 4]"
        class="bg-secondary-50 rounded-lg p-6 shadow-sm"
      >
        <div class="flex justify-between items-center">
          <!-- Order ID -->
          <span class="text-xs text-secondary"> Order ID: 12717 </span>
          <!-- end Order ID -->
          <strong class="text-xs"> Processed </strong>
        </div>

        <div class="mt-1">
          <h3 class="font-bold">PRO - Monthly USD</h3>
          <span class="text-xs text-secondary"> 20 Mar 2022 </span>
        </div>

        <div class="flex items-center justify-between mt-2">
          <h4 class="font-medium">$12</h4>

          <!-- Download Invoice -->
          <button title="Download Invoice for this Purchase">
            <i class="fa-solid fa-cloud-arrow-down text-primary"></i>
          </button>
          <!-- end Download Invoice -->
        </div>
      </li>
    </ul>
  `,
})
export class PaymentHistoryListComponent {}
