import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'lbk-invoice-details-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-elements flex flex-wrap justify-end gap-2 py-5 shadow-md px-6 md:bg-transparent md:shadow-none md:py-0 md:px-0"
    >
      <!-- Edit -->
      <button
        [disabled]="isPending"
        (click)="updateInvoice.emit()"
        class="btn btn-basic"
      >
        Edit
      </button>
      <!-- end Edit -->

      <!-- Delete Invoice Button -->
      <lbk-spinner [loading]="pendingDelete">
        <button
          [disabled]="isPending"
          (click)="deleteInvoice.emit()"
          class="btn btn-danger"
        >
          Delete
        </button>
      </lbk-spinner>
      <!-- end Delete Invoice Button -->

      <!-- Mask As Paid Button-->
      <lbk-spinner [loading]="pendingMaskAsPaid">
        <button
          *ngIf="!isPaid"
          [disabled]="pendingMaskAsPaid"
          (click)="maskAsPaid.emit()"
          class="btn btn-primary"
        >
          Mask as Paid
        </button>
      </lbk-spinner>
      <!-- end Mask As Paid Button-->
    </div>
  `,
})
export class InvoiceDetailsActionsComponent {
  @Input() error!: string;
  @Input() isPaid!: boolean;
  @Input() pendingMaskAsPaid!: boolean;
  @Input() pendingDelete!: boolean;

  @Output() updateInvoice = new EventEmitter<void>();
  @Output() deleteInvoice = new EventEmitter<void>();
  @Output() maskAsPaid = new EventEmitter<void>();

  get isPending() {
    return this.pendingMaskAsPaid || this.pendingDelete;
  }
}
