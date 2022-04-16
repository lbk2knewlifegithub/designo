import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="container flex justify-between py-8 md:py-16">
      <div>
        <img
          class="max-w-[197px]"
          src="assets/shared/desktop/logo-dark.png"
          alt="Logo"
        />
      </div>

      <img class="md:hidden" src="assets/shared/mobile/icon-hamburger.svg" />

      <ul class="hidden gap-[42px] text-xs md:flex">
        <li><a> OUR COMPANY </a></li>
        <li><a>LOCATIONS</a></li>
        <li><a>CONTACT</a></li>
      </ul>
    </header>

    <!-- Our Company
  Locations
  Contact -->
  `,
})
export class HeaderComponent {}
