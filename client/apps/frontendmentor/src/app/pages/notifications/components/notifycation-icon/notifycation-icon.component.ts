import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { NotifyType } from '../../models';

@Component({
  selector: 'lbk-notification-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./notification-icon.component.scss'],
  template: ` <i class="fa-solid {{ icon }}"></i> `,
})
export class NotificationIconComponent implements OnInit {
  icon!: string;
  @Input() type!: NotifyType;

  @Input() class!: string;

  @HostBinding('class') get banana() {
    return `${this.class ?? ''} ${this.type}`;
  }

  ngOnInit(): void {
    this.icon = {
      like: 'fa-heart',
      upload: 'fa-code',
      upvote: 'fa-angle-up',
      mention: 'fa-at',
      reply: 'fa-reply',
      follow: 'fa-user-plus',
      bookmark: 'fa-bookmark',
      comment: 'fa-message',
    }[this.type];
  }
}
