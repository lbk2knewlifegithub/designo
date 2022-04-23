import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthFacade } from '@lbk/auth';
import { DialogService } from '@ngneat/dialog';
import { combineLatest, map, Observable, take } from 'rxjs';
import { InvoiceFormComponent, InvoiceStatus } from '../../../../shared';
import { InvoicesFacade } from './../../../../state';
import { HomeFacade } from './../../state';

@Component({
  selector: 'lbk-new-invoice-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-invoice-overlay.component.html',
})
export class NewInvoiceOverlayComponent implements OnInit {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceFormComponent!: InvoiceFormComponent;
  showNewInvoiceOverlay$!: Observable<boolean>;
  pendingSaveAsDraft$!: Observable<boolean>;
  pendingCreate$!: Observable<boolean>;
  loggedIn$!: Observable<boolean>;

  constructor(
    private readonly _dialogService: DialogService,
    private readonly _homeFacade: HomeFacade,
    private readonly _invoicesFacade: InvoicesFacade,
    private readonly _authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.showNewInvoiceOverlay$ = this._homeFacade.shownCreateInvoiceOverlay$;

    this.pendingSaveAsDraft$ = this._homeFacade.pendingSaveAsDraft$;

    this.pendingCreate$ = this._homeFacade.pendingCreate$;

    this.loggedIn$ = this._authFacade.loggedIn$;
  }

  get invalid() {
    return this.invoiceForm.invalid;
  }

  /**
   *
   * @returns - On Discard
   */
  discard() {
    combineLatest([this.pendingCreate$, this.pendingSaveAsDraft$])
      .pipe(
        map(
          ([pendingCreate, pendingSaveAsDraft]) =>
            pendingCreate || pendingSaveAsDraft
        ),
        take(1)
      )
      .subscribe((pending) => {
        if (pending) return;

        if (this.invoiceForm.dirty) {
          this._dialogService
            .confirm({
              title: 'Are you sure you want to discard changes?',
              body: 'All changes will be lost.',
            })
            .afterClosed$.pipe(take(1))
            .subscribe((confirm) => {
              if (confirm) {
                this._homeFacade.closeCreateInvoiceOverlay();
                this.invoiceFormComponent.initForm(true);
              }
            });

          return;
        }

        this._homeFacade.closeCreateInvoiceOverlay();
        this.invoiceFormComponent.initForm(true);
      });
  }

  get invoiceForm(): FormGroup {
    return this.invoiceFormComponent.form;
  }

  /**
   * - Create Invoice
   */
  create() {
    this.invoiceFormComponent.check();
    if (this.invoiceForm.invalid) {
      this._dialogService.error({
        title: 'Invalid form',
        body: 'Please check the form and try again.',
      });
      return;
    }

    const createInvoiceDTO = this.invoiceFormComponent.createInvoiceDTO(
      InvoiceStatus.PENDING
    );
    this._invoicesFacade.createInvoice(createInvoiceDTO);
    this.invoiceFormComponent.initForm(true);
  }

  /**
   * - Save As Draft
   */
  saveAsDraft() {
    this.invoiceFormComponent.check();

    if (this.invoiceForm.invalid) {
      this._dialogService.error({
        title: 'Invalid form',
        body: 'Please check the form and try again.',
      });
      return;
    }

    const createInvoiceDTO = this.invoiceFormComponent.createInvoiceDTO(
      InvoiceStatus.DRAFT
    );

    this._invoicesFacade.createInvoice(createInvoiceDTO);
    this.invoiceFormComponent.initForm(true);
  }
}
