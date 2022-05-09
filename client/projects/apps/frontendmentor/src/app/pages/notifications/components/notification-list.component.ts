import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { identifyNotification, Notification } from '../models';

@Component({
  selector: 'lbk-notification-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid gap-4 place-items-center">
      <li
        class="w-full max-w-[798px]"
        *ngFor="
          let notification of notifications;
          trackBy: identifyNotification
        "
      >
        <lbk-notification [notification]="notification"></lbk-notification>
      </li>
    </ul>
  `,
})
export class NotificationListComponent {
  @Input() notifications!: Notification[];
  identifyNotification = identifyNotification;
}
