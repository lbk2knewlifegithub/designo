import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[zippyContent]',
})
export class ZippyContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
