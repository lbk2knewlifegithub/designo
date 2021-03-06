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
import { Invoice, InvoiceFormComponent } from '../../../../shared';
import { UpdateInvoiceDTO } from './../../../../shared/dto/update-invoice.dto';

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
    // Check Form Changes
    if (this.invoiceFormComponent.notChanges) {
      this._dialogService.error({
        title: 'Notthing to Update',
        body: "You haven't made any changes.",
      });
      return;
    }

    // Check Form Valid
    if (this.invoiceForm.invalid && this.invoiceForm.touched) {
      this.invoiceForm.markAllAsTouched();
      this._dialogService.error({
        title: 'Form Invalid',
        body: 'Please fill out all required fields.',
      });
      return;
    }

    // Create Update Invoice DTO
    const updateInvoiceDTO = this.invoiceFormComponent.createUpdateInvoiceDTO();

    this.updateInvoice.emit(updateInvoiceDTO);

    this.invoiceFormComponent.resetDirty();
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
