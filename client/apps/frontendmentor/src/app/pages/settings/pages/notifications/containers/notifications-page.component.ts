import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-notifcations-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./notifications-page.component.html`,
})
export class NotificationsPageComponent {}
