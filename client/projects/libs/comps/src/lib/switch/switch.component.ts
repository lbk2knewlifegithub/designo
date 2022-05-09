import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  selector: 'lbk-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="switch">
      <input type="checkbox" />
      <div></div>
    </label>
  `,
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() activated!: boolean;
}

@NgModule({
  exports: [SwitchComponent],
  declarations: [SwitchComponent],
})
export class SwitchModule {}
