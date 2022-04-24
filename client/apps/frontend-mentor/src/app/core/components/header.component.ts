import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <nav class="flex justify-between items-center pr-5 border-b">
        <!-- Logo Mobile -->
        <img
          class="p-[17px] border-r md:hidden"
          src="assets/images/logo-mobile.svg"
          alt="Logo Mobile"
        />
        <!-- end Logo Mobile -->

        <!-- Logo Tablet -->
        <img
          class="hidden min-w-[196px] py-[17px] pl-[17px] md:block"
          src="assets/images/logo-desktop.svg"
          alt="Logo Mobile"
        />
        <!-- end Logo Tablet -->

        <!-- Hamburger  -->
        <lbk-menu-one color="black"></lbk-menu-one>
        <!-- end Hamburger  -->
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
