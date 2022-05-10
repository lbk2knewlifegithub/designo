import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lbk-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <label class="switch">
        <input [formControlName]="name" type="checkbox" />
        <div></div>
      </label>
    </div>
  `,
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() parent!: FormGroup;
  @Input() name!: string;
}

@NgModule({
  imports: [ReactiveFormsModule],
  exports: [SwitchComponent],
  declarations: [SwitchComponent],
})
export class SwitchModule {}
