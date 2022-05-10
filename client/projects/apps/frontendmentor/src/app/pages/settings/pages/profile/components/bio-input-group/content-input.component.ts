import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'lbk-content-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div formGroupName="bio">
        <label class="text-sm font-medium" for="bio">Content</label>
        <br />

        <textarea
          formControlName="content"
          placeholder="e.g. https://www.youtube.com"
          class="w-full"
          id="bio"
          rows="10"
          type="text"
        ></textarea>

        <div class="text-xs text-right">
          Characters remainig: <strong>300</strong>
        </div>
      </div>
    </div>
  `,
})
export class ContentInputComponent {
  @Input() parent!: FormGroup;
}
