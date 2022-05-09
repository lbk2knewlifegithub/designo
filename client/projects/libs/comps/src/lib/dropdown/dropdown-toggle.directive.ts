import { Directive, HostListener } from '@angular/core';
import { DropDownComponent } from './dropdown.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dropDownToggle]',
})
export class DropDownToggleDirective {
  @HostListener('click') mouseEnter() {
    this._d.toggle(true);
  }

  @HostListener('blur') blur() {
    setTimeout(() => {
      this._d.close(true);
    }, 500);
  }
  constructor(private readonly _d: DropDownComponent) {}
}
