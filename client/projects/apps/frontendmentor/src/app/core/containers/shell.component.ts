import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-header></lbk-header>
    <router-outlet></router-outlet>
    <lbk-footer></lbk-footer>
  `,
})
export class ShellComponent {}
