import { Directive, HostBinding, HostListener } from '@angular/core';
import { ZippyComponent } from './zippy.component';

@Directive({
  selector: 'button[zippyToggle]',
})
export class ZippyToggleDirective {
  @HostBinding('attr.aria-expanded') ariaExpanded = this.zippy.expanded;
  @HostBinding('attr.aria-controls') ariaControls = this.zippy.contentId;

  @HostListener('click') toggleZippy() {
    this.zippy.expanded = !this.zippy.expanded;
    this.zippy.maskForCheck();
  }
  constructor(public zippy: ZippyComponent) {}
}
