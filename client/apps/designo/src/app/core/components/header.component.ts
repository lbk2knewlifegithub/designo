import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex justify-between py-8 container">
      <img
        class="max-w-[197px]"
        src="assets/shared/desktop/logo-dark.png"
        alt="Logo"
      />

      <img src="assets/shared/mobile/icon-hamburger.svg" />
    </header>

    <!-- Our Company
  Locations
  Contact -->
  `,
})
export class HeaderComponent {}
