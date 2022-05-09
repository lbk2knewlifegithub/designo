import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[unsubscribers]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class Unsubscriber implements OnInit, OnDestroy {
  protected subscriptions!: Subscription[];

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
