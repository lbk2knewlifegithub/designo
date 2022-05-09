import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a routerLink="/">
      <img src="assets/shared/desktop/logo.svg" alt="Logo" />
    </a>
  `,
})
export class LogoComponent {}
