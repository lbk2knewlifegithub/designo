import { Directive, HostBinding, HostListener } from '@angular/core';
import { ZippyComponent } from './zippy.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[zippyToggle]',
})
export class ZippyToggleDirective {
  @HostBinding('attr.aria-expanded') ariaExpanded = this.zippy.expanded;
  @HostBinding('attr.aria-controls') ariaControls = this.zippy.zippyId;

  @HostListener('click') toggleZippy() {
    this.zippy.toggle();
  }
  constructor(public zippy: ZippyComponent) {}
}
