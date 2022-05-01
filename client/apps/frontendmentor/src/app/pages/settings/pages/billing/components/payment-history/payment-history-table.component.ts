import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-payment-history-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="w-full table-fixed">
      <thead>
        <tr class="text-left bg-secondary-50">
          <th>Status</th>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Invoice</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let i of [1, 2, 3, 4]">
          <!-- Status -->
          <td>Processed</td>
          <!-- end Status -->

          <!-- ID -->
          <td>12717</td>
          <!-- end ID -->

          <!-- Name -->
          <td>PRO - Monthly USD</td>
          <!-- end Name -->

          <!-- Date -->
          <td>20 Mar 2022</td>
          <!-- end Date -->

          <!-- Amount -->
          <td>$12</td>
          <!-- end Amount -->

          <!-- Download Invoice Button -->
          <td>
            <div class="flex justify-end pr-4 lg:pr-6">
              <button title="Download Invoice for this Purchase">
                <i
                  class="fa-solid fa-cloud-arrow-down text-primary text-lg"
                ></i>
              </button>
            </div>
          </td>
          <!-- end Download Invoice Button -->
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        thead {
          th {
            @apply py-4 pl-4 text-sm lg:text-lg lg:pl-8;
          }
        }

        tbody {
          tr {
            td {
              @apply text-xs pl-4 py-3 lg:text-sm lg:pl-8;
            }
          }
        }
      }
    `,
  ],
})
export class PaymentHistoryTableComponent {}
