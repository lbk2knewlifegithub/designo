import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification } from '../../models';

@Component({
  selector: 'lbk-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notification.component.html',
  styles: [
    `
      :host {
        @apply block border bg-white rounded-lg p-5 sm:p-6;
      }
    `,
  ],
})
export class NotificationComponent {
  @Input() notification!: Notification;
}
