import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDays, decimalRegex } from '@lbk/utils';
import { Address, Invoice, InvoiceStatus, Item } from '../../../models';
import { CreateInvoiceDTO, UpdateInvoiceDTO } from './../../../dto';

@Component({
  selector: 'lbk-invoice-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-form.component.html',
})
export class InvoiceFormComponent implements OnInit {
  @Input() invoice?: Invoice;

  form!: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   *  - Create Invoice DTO
   * @param newStatus
   * @returns
   */
  createInvoiceDTO(newStatus: InvoiceStatus): CreateInvoiceDTO {
    const { billFrom, billTo, items } = this.form.value;
    const { createdAt, paymentTerms } = billTo;

    const createdAtFormatted = this.formatDate(createdAt);
    const paymentDue = addDays(createdAtFormatted, paymentTerms);

    return {
      senderAddress: billFrom,
      status: newStatus,
      createdAt: createdAtFormatted,
      paymentDue,
      ...this.formatBillTo(billTo),
      paymentTerms: parseInt(billTo.paymentTerms),
      items: this.formatItems(items),
    };
  }

  /**
   * - Update Invoice DTO
   * @returns
   */
  updateInvoiceDTO(): UpdateInvoiceDTO {
    return this.form.value;
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

  private formatDate(date: any) {
    if (typeof date === 'string') return date;
    if (typeof date === 'object') return (date as Date).toISOString();
    console.log(date);
    return date;
  }

  private _initAddress(address: Partial<Address | undefined>) {
    const { street, city, postCode, country } = address ?? {};

    return this._fb.group({
      street: [
        street ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      city: [
        city ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      postCode: [
        postCode ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      country: [
        country ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  private createItem(item: Partial<Item>) {
    const { name, quantity, price } = item;
    return this._fb.group({
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
        clientName ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      clientEmail: [clientEmail ?? '', [Validators.required, Validators.email]],
      clientAddress: this._initAddress(this.invoice?.clientAddress),
      createdAt: [createdAt ?? new Date().toISOString(), [Validators.required]],
      paymentTerms: [
        paymentTerms ?? 30,
        [Validators.required, Validators.pattern(decimalRegex)],
      ],
      description: [
        description ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
    });
  }
}
