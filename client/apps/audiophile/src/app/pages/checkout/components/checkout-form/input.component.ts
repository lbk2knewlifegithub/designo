import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroupComponent } from './form-group.component';

@Component({
  selector: 'lbk-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formGroupName]="groupName">
        <div class="flex justify-between">
          <label [for]="controlName" class="text-xs font-bold">{{
            label | titlecase
          }}</label>

          <!-- errors -->
          <div class="error">
            <p *ngIf="required">Required</p>
            <p *ngIf="wrongFormat && !required">Wrong format</p>
          </div>
          <!-- end errors -->
        </div>

        <input
          [formControlName]="controlName"
          [id]="controlName"
          class="mt-2"
          type="text"
          [placeholder]="placeHolder"
        />
      </div>
    </div>
  `,
})
export class InputComponent extends FormGroupComponent implements OnInit {
  @Input() controlName!: string;
  @Input() placeHolder!: string;
  @Input() label!: string;

  get formControl(): FormControl {
    return this.parent
      .get(this.groupName)
      ?.get(this.controlName) as FormControl;
  }

  get required() {
    return this.formControl.hasError('required') && this.formControl.touched;
  }

  get wrongFormat() {
    const hasError = !!this.formControl.errors;
    return hasError && this.formControl.touched;
  }

  ngOnInit(): void {
    if (!this.label) this.label = this.controlName;
  }
}
