import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroupComponent } from './form-group.component';

@Component({
  selector: 'lbk-input-array',
  template: `
    <div [formGroup]="parent">
      <div [formArrayName]="arrayName">
        <div [formGroupName]="groupName">
          <label [for]="controlName" class="text-muted-600">{{
            label | titlecase
          }}</label>

          <input
            [formControlName]="controlName"
            [attr.disabled]="disabled ? 'disabled' : null"
            class="mt-3"
            [id]="controlName"
            [type]="inputType"
            [placeholder]="placeHolder"
          />
        </div>
      </div>
    </div>
  `,
})
export class InputArrayComponent extends FormGroupComponent implements OnInit {
  @Input() controlName!: string;
  @Input() placeHolder!: string;
  @Input() label!: string;
  @Input() inputType = 'text';
  @Input() disabled = false;

  get formControl(): FormControl {
    return this.parent
      .get(this.groupName + '')
      ?.get(this.controlName) as FormControl;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.label) this.label = this.controlName;
  }
}
