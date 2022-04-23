import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { decimalRegex } from '@lbk/utils';
import { finalize, Observable, switchMap, take } from 'rxjs';
import {
  Address,
  CreateInvoiceDTO,
  EvaluateItems,
  Invoice,
  InvoiceStatus,
  INVOICES_SERVICE,
  Item,
  UpdateInvoiceDTO
} from '../../../../shared';
import { InvoicesService } from '../../../../state';

@Component({
  selector: 'lbk-invoice-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-form.component.html',
})
export class InvoiceFormComponent implements OnInit {
  @Input() invoice?: Invoice;

  form!: FormGroup;
  loading!: boolean;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _cd: ChangeDetectorRef,
    @Inject(INVOICES_SERVICE)
    private readonly _invoicesService: Observable<InvoicesService>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loading = false;
  }

  /**
   *  - Create Invoice DTO
   * @param newStatus
   * @returns
   */
  createInvoiceDTO(newStatus: InvoiceStatus): CreateInvoiceDTO {
    const { billFrom, billTo, items } = this.form.value;
    const { createdAt } = billTo;

    return {
      senderAddress: billFrom,
      status: newStatus,
      createdAt: new Date(createdAt).toISOString(),
      ...this.formatBillTo(billTo),
      paymentTerms: parseInt(billTo.paymentTerms),
      items: this.formatItems(items),
    };
  }

  /**
   * - Create Update Invoice DTO
   * @returns
   */
  createUpdateInvoiceDTO(): UpdateInvoiceDTO {
    const { billFrom, billTo, items: newItems } = this.form.value;
    const { createdAt } = billTo;

    const oldInvoice = this.invoice as Invoice;

    return {
      invoice_id: oldInvoice.invoice_id,
      senderAddress: billFrom,
      createdAt: new Date(createdAt).toISOString(),
      ...this.formatBillTo(billTo),
      paymentTerms: parseInt(billTo.paymentTerms),
      status: oldInvoice.status,
      items: EvaluateItems.evaluate(newItems || [], oldInvoice.items || []),
    };
  }

  initForm(maskForCheck: boolean = false) {
    this.form = this._fb.group({
      billFrom: this._initAddress(this.invoice?.senderAddress),
      billTo: this._initBillTo,
      items: this._initItems,
    });

    if (maskForCheck) this._cd.markForCheck();
  }

  deleteItem(index: number) {
    this.items.removeAt(index);
  }

  addNewItem() {
    this.items.push(this.createItem({}));
  }

  private formatBillTo(billTo: any) {
    const result = { ...billTo };
    delete result.createdAt;
    return result;
  }

  private formatItems(items: any) {
    return (items as Item[]).map((i) => ({
      name: i.name,
      quantity: parseInt(i.quantity + ''),
      price: parseFloat(i.price + ''),
    }));
  }

  private _initAddress(address: Partial<Address | undefined>) {
    const { street, city, postCode, country, address_id } = address ?? {};

    return this._fb.group({
      address_id: [address_id],
      street: [street ?? '', [Validators.required, Validators.maxLength(100)]],
      city: [city ?? '', [Validators.required, Validators.maxLength(100)]],
      postCode: [
        postCode ?? '',
        [Validators.required, Validators.maxLength(100)],
      ],
      country: [
        country ?? '',
        [Validators.required, Validators.maxLength(100)],
      ],
    });
  }

  private createItem(item: Partial<Item>) {
    const { name, quantity, price } = item;

    const itemConfig: { [key: string]: unknown } = {};

    if (item.item_id) {
      itemConfig['item_id'] = item.item_id;
    }

    return this._fb.group({
      ...itemConfig,
      name: [
        name ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],

      quantity: [
        quantity ?? 1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100_000),
          Validators.pattern(decimalRegex),
        ],
      ],
      price: [
        price ?? 1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100_000_000),
          Validators.pattern(decimalRegex),
        ],
      ],
    });
  }

  get isEdit() {
    return !!this.invoice;
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  private get _initItems(): FormArray {
    const { items } = this.invoice ?? {};
    return this._fb.array(items?.map((i) => this.createItem(i)) || []);
  }

  private get _initBillTo(): FormGroup {
    const { clientName, clientEmail, createdAt, paymentTerms, description } =
      this.invoice || {};

    return this._fb.group({
      clientName: [
        clientName || '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      clientEmail: [clientEmail || '', [Validators.required, Validators.email]],
      clientAddress: this._initAddress(this.invoice?.clientAddress),
      createdAt: [
        formatDate(createdAt || new Date(), 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      paymentTerms: [
        paymentTerms || 30,
        [Validators.required, Validators.pattern(decimalRegex)],
      ],
      description: [
        description || '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  /**
   * - Random Invoice
   */
  randomInvoice() {
    this.loading = true;
    this._invoicesService
      .pipe(
        switchMap((service) => service.randomInvoice()),
        take(1),
        finalize(() => {
          this.loading = false;
          // Add items
          this._cd.detectChanges();
        })
      )
      .subscribe((randomInvoice) => {
        const {
          clientAddress,
          senderAddress,
          clientEmail,
          clientName,
          description,
          createdAt,
          items,
          paymentTerms,
          status,
        } = randomInvoice;

        const {
          billFrom: { address_id: sender_address_id },
          billTo: {
            clientAddress: { address_id: client_address_id },
          },
        } = this.form.value;

        this.form.reset({
          billFrom: { ...senderAddress, address_id: sender_address_id },
          billTo: {
            clientName,
            clientEmail,
            clientAddress: { ...clientAddress, address_id: client_address_id },
            createdAt: formatDate(createdAt, 'yyyy-MM-dd', 'en'),
            paymentTerms,
            description,
          },
          status,
        });

        this.items.clear();
        items?.forEach((item) => {
          this.items.push(this.createItem(item));
        });
      });
  }

  check() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    this._cd.detectChanges();
  }

  /**
   * - Not Changes
   * @returns
   */
  get notChanges(): boolean {
    if (!this.invoice) return false;
    return JSON.stringify(this.form.value) === JSON.stringify(this.invoice);
  }

  resetDirty() {
    return this.form.reset(this.form.value);
  }
}
