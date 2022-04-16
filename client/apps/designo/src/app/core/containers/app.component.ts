import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-header></lbk-header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
