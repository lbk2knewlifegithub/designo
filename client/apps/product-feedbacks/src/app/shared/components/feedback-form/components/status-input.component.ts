import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeedbackStatus } from '@lbk/models';

@Component({
  selector: 'lbk-status-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <h4>Update Status</h4>
      <span class="text-neutral text-xs">Change feature state</span>

      <select formControlName="status">
        <option *ngFor="let status of statuses" [ngValue]="status">
          {{ status | upper }}
        </option>
      </select>
    </div>
  `,
})
export class StatusInputComponent {
  @Input() parent!: FormGroup;

  statuses = Object.values(FeedbackStatus);
}
