import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormGroupComponent } from '../form-helper/form-group.component';

@Component({
  selector: 'lbk-items-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formArrayName]="arrayName">
        <!-- Title  -->
        <h3 class="text-muted-900 lg:text-18px">Item List</h3>
        <!-- end Title  -->

        <lbk-invoice-item-form-list
          class="block mt-6"
          (deleteItem)="deleteItem.emit($event)"
          (addNewItem)="addNewItem.emit()"
          [arrayName]="arrayName"
          [parent]="parent"
          [items]="items"
        ></lbk-invoice-item-form-list>
      </div>
    </div>
  `,
})
export class ItemsFormComponent extends FormGroupComponent {
  @Output() deleteItem = new EventEmitter<number>();
  @Output() addNewItem = new EventEmitter<void>();

  get items(): FormGroup[] {
    return (this.parent.get('items') as FormArray).controls as FormGroup[];
  }
}
