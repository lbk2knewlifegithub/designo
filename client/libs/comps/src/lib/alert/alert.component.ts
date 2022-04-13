import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() class = '';

  get isInfo() {
    return this.class.includes('info');
  }

  get isSuccess() {
    return this.class.includes('success');
  }

  get isWarning() {
    return this.class.includes('warning');
  }

  get isError() {
    return this.class.includes('error');
  }
}
