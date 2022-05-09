import { Component, OnInit } from '@angular/core';
import { Unsubscriber } from '@lbk/comps';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Component({
  selector: 'lbk-image-compare',
  template: `
    <!-- Image Right -->
    <img
      src="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_900/Challenges/mow7ca07z3qa0ffbwc2p.jpg"
      [ngStyle]="{ clip: left$ | async | clipRight }"
      alt=""
    />
    <!-- end Image Right -->

    <!-- Image Left  -->
    <img
      src="https://res.cloudinary.com/dz209s6jk/image/upload/q_auto,w_900/Screenshots/gk0l89idqmbdjlzstybs.jpg"
      [ngStyle]="{ clip: left$ | async | clipLeft }"
      alt=""
    />

    <!-- end Image Left  -->

    <!-- Bar -->
    <lbk-bar
      id="bar"
      (mousedown)="barMove($event)"
      [ngStyle]="{ left: left$ | async | pixel: 20 }"
      class="absolute top-0 left-0 h-full"
    ></lbk-bar>
    <!-- end Bar -->
  `,
  styles: [
    `
      :host {
        @apply block relative w-full h-[460px] overflow-hidden;

        img {
          @apply block h-full w-full object-cover absolute inset-0;
        }
      }
    `,
  ],
})
export class ImageCompareComponent extends Unsubscriber implements OnInit {
  private _left = new BehaviorSubject(0);
  get left() {
    return this._left.getValue();
  }

  set left(left: number) {
    this._left.next(left);
  }
  left$ = this._left.asObservable();

  private _hold = new BehaviorSubject(false);
  hold$ = this._hold.asObservable();
  get hold() {
    return this._hold.getValue();
  }

  set hold(hold: boolean) {
    this._hold.next(hold);
  }

  mouseMove$ = fromEvent(document, 'mousemove');
  mouseUp$ = fromEvent(document, 'mouseup');

  override ngOnInit(): void {
    super.ngOnInit();
    this.appendSub = this.mouseMove$.subscribe((event) => {
      if (!this.hold) return;
      const e = event as MouseEvent;
      this.left = e.clientX - 20;
    });

    this.appendSub = this.mouseUp$.subscribe(() => {
      if (!this.hold) return;
      this.hold = false;
    });
  }

  barMove(event: MouseEvent) {
    event.preventDefault();
    this.hold = true;
  }
}
