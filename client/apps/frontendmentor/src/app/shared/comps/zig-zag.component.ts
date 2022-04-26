import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'lbk-zig-zag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        background-repeat: no-repeat;
        background-position: 0 105%;
        background-image: url('/assets/images/shared/zig-zag-underline.svg');
      }
    `,
  ],
})
export class ZigZagComponent {}

@NgModule({
  exports: [ZigZagComponent],
  declarations: [ZigZagComponent],
})
export class ZigZagModule {}
