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
  Invoice,
  InvoiceFormComponent,
  UpdateInvoiceDTO,
} from '../../../../shared';

@Component({
  selector: 'lbk-edit-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-overlay.component.html',
})
export class EditOverlayComponent {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceFormComponent!: InvoiceFormComponent;

  @Input() open!: boolean;
  @Input() pendingSaveAndChange!: boolean;
  @Input() invoice!: Invoice;

  @Output() goBack = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() updateInvoice = new EventEmitter<UpdateInvoiceDTO>();

  constructor(private readonly _dialogService: DialogService) {}

  /**
   * - On Save Changes
   * @returns
   */
  saveChange() {
    if (this.invoiceForm.invalid && this.invoiceForm.touched) {
      this.invoiceForm.markAllAsTouched();
      // invalid
      this._dialogService.error({
        title: 'Form Invalid',
        body: 'Please fill out all required fields.',
      });
      return;
    }

    const updateInvoiceDTO = this.invoiceFormComponent.updateInvoiceDTO();

    this.updateInvoice.emit(updateInvoiceDTO);
    this.invoiceForm.markAsUntouched();
  }

  onCancel() {
    if (this.pendingSaveAndChange) return;

    if (this.invoiceForm.dirty) {
      this._dialogService
        .confirm({
          title: 'You have unsaved changes.',
          body: 'Are you sure you want to cancel?',
        })
        .afterClosed$.pipe(take(1))
        .subscribe((confirm) => {
          if (confirm) {
            this.cancel.emit();
            this.invoiceFormComponent.initForm(true);
          }
        });

      return;
    }

    this.cancel.emit();
    this.invoiceFormComponent.initForm(true);
  }

  get invoiceForm(): FormGroup {
    return this.invoiceFormComponent.form;
  }
}
