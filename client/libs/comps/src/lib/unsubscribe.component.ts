import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lbk-unsubscribe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UnSubscribe implements OnInit, OnDestroy {
  subscriptions!: Subscription[];

  set appendSub(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
