import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dropDownContent]',
})
export class DropDownContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
