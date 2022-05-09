import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <lbk-attribution></lbk-attribution> `,
})
export class FooterComponent {}
