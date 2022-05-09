import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupComponent } from '../form-helper/form-group.component';

@Component({
  selector: 'lbk-invoice-item-form-list',
  template: `
    <div [formGroup]="parent">
      <div class="grid gap-12" [formArrayName]="arrayName">
        <ng-container *ngFor="let item of items; index as i">
          <lbk-invoice-item-input
            (deleteItem)="deleteItem.emit(i)"
            [arrayName]="arrayName"
            [parent]="parent"
            [groupName]="i + ''"
          ></lbk-invoice-item-input>
        </ng-container>

        <!-- Add New Item Button -->
        <button
          (click)="addNewItem.emit()"
          aria-label="Add New Item"
          type="button"
          class="rounded-full flex w-full py-4 bg-fill justify-center gap-1 dark:bg-elements"
        >
          <span>+</span>
          <span class="font-bold text-muted-900">Add New Item</span>
        </button>
        <!-- end Add New Item Button -->
      </div>
    </div>
  `,
})
export class InvoiceItemInputListComponent extends FormGroupComponent {
  @Input() items!: FormGroup[];

  @Output() addNewItem = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<number>();
}
