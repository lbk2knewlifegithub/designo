import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Item } from '../../../../../models';
import { TotalPriceItemPipe } from '../../../../../pipes';
import { FormGroupComponent } from '../../form-helper/form-group.component';

@Component({
  selector: 'lbk-invoice-item-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-item-input.component.html',
})
export class InvoiceItemInputComponent
  extends FormGroupComponent
  implements OnInit
{
  quantityFormControl!: FormControl;
  priceFormControl!: FormControl;
  total$!: Observable<number>;

  @Output() deleteItem = new EventEmitter<void>();

  constructor(private readonly _totalPriceItemPipe: TotalPriceItemPipe) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();
    const itemFormGroup = this.parent
      .get('items')
      ?.get(this.groupName) as FormGroup;

    this.total$ = itemFormGroup.valueChanges.pipe(
      startWith(itemFormGroup.value),
      map((item) => this.calculateTotal(item))
    );
  }

  private calculateTotal(item: Item) {
    return this._totalPriceItemPipe.transform(item);
  }
}
