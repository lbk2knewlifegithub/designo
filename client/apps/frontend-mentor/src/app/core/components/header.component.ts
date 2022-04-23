import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <nav class="flex justify-between items-center pr-5 border-b">
        <!-- Logo Mobile -->
        <img
          class="p-[17px] border-r"
          src="assets/images/logo-mobile.svg"
          alt="Logo Mobile"
        />
        <!-- end Logo Mobile -->

        <!-- Hamburger  -->
        <lbk-menu-one color="black"></lbk-menu-one>
        <!-- end Hamburger  -->
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
