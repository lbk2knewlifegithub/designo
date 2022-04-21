import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { take } from 'rxjs';
import {
  CreateInvoiceDTO,
  InvoiceFormComponent,
  InvoiceStatus,
} from '../../../../shared';

@Component({
  selector: 'lbk-new-invoice-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-invoice-overlay.component.html',
})
export class NewInvoiceOverlayComponent {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceFormComponent!: InvoiceFormComponent;

  @Input() open!: boolean;
  @Input() pendingSaveAsDraft!: boolean;
  @Input() pendingCreate!: boolean;
  @Input() loggedIn!: boolean;

  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<CreateInvoiceDTO>();
  @Output() create = new EventEmitter<CreateInvoiceDTO>();

  constructor(private readonly _dialogService: DialogService) {}

  get invalid() {
    return this.invoiceForm.invalid;
  }

  onDiscard() {
    if (this.pendingCreate || this.pendingSaveAsDraft) return;

    if (this.invoiceForm.dirty) {
      this._dialogService
        .confirm({
          title: 'Are you sure you want to discard changes?',
          body: 'All changes will be lost.',
        })
        .afterClosed$.pipe(take(1))
        .subscribe((confirm) => {
          if (confirm) {
            this.discard.emit();
            this.invoiceFormComponent.initForm(true);
          }
        });

      return;
    }

    this.discard.emit();
    this.invoiceFormComponent.initForm(true);
  }

  get invoiceForm(): FormGroup {
    return this.invoiceFormComponent.form;
  }

  /**
   * - Create Invoice
   */
  onCreate() {
    this.invoiceForm.markAllAsTouched();

    console.log(this.invoiceForm.invalid);
    if (this.invoiceForm.invalid) {
      this._dialogService.error({
        title: 'Invalid form',
        body: 'Please check the form and try again.',
      });
      return;
    }

    this.create.emit(
      this.invoiceFormComponent.createInvoiceDTO(InvoiceStatus.PENDING)
    );
    this.invoiceFormComponent.initForm(true);
  }

  /**
   * - Save As Draft
   */
  onSaveAsDraft() {
    this.invoiceForm.markAllAsTouched();

    if (this.invoiceForm.invalid) {
      this._dialogService.error({
        title: 'Invalid form',
        body: 'Please check the form and try again.',
      });
      return;
    }

    this.create.emit(
      this.invoiceFormComponent.createInvoiceDTO(InvoiceStatus.DRAFT)
    );

    this.invoiceFormComponent.initForm(true);
  }
}
