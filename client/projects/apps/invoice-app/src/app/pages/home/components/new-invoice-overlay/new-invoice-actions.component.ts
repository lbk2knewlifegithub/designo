import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'lbk-new-invoice-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-wrap gap-2 items-center justify-end sm:justify-between"
    >
      <!-- Discard Button -->
      <button
        [disabled]="disabled"
        (click)="discard.emit()"
        class="btn btn-basic dark:bg-[#F9FAFE] dark:text-muted-700"
      >
        Discard
      </button>
      <!-- end DisCard Button -->

      <div class="flex gap-2">
        <!-- Save as Draft Button -->
        <!-- [pending]="pendingSaveAsDraft" -->
        <button
          [disabled]="disabled"
          (click)="saveAsDraft.emit()"
          class="btn btn-dark"
        >
          Save as Draft
        </button>
        <!-- end Save as Draft Button -->

        <!-- Create New Invoice Button -->
        <!-- [pending]="pendingCreate" -->
        <button
          [disabled]="disabled"
          (click)="create.emit()"
          class="btn btn-primary"
        >
          Save & Send
        </button>
        <!-- end Create New Invoice Button -->
      </div>
    </div>
  `,
})
export class NewInvoiceActionsComponent {
  @Input() pendingSaveAsDraft!: boolean;
  @Input() pendingCreate!: boolean;

  @Output() create = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<void>();

  get disabled() {
    return this.pendingCreate || this.pendingSaveAsDraft;
  }
}
