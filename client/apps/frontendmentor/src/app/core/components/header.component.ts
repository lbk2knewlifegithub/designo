import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="container">
      <nav class="flex justify-between items-center pr-5 border-b lg:py-1">
        <!-- Logo Mobile -->
        <img
          class="p-[17px] border-r md:hidden "
          src="assets/images/logo-mobile.svg"
          alt="Logo Mobile"
        />
        <!-- end Logo Mobile -->

        <!-- Logo Tablet -->
        <img
          class="hidden min-w-[196px] py-[17px] pl-[17px] md:block lg:pl-0"
          src="assets/images/logo-desktop.svg"
          alt="Logo Mobile"
        />
        <!-- end Logo Tablet -->

        <div class="hidden gap-8 items-center lg:flex">
          <!-- Link Desktop -->
          <ul class="italic font-bold flex gap-4 text-sm">
            <li>
              <a href="">CHALLENGES</a>
            </li>
            <li>
              <a href="">SOLUTIONS</a>
            </li>
            <li>
              <a href="">RESOURCES</a>
            </li>
            <li>
              <a class="flex gap-2 items-center" href=""
                >UNLOCK
                <span
                  class="text-xs rounded-sm  bg-primary text-white py-[2px] px-2"
                  >PRO</span
                >
              </a>
            </li>
            <li>
              <a href="">HIRE DEVELOPERS</a>
            </li>
          </ul>
          <!-- end Link Desktop -->

          <!-- Login With Github -->
          <a
            class="inline-flex items-center font-medium text-heading text-sm gap-2 py-2 px-5 bg-dark text-white rounded-full"
            href="#"
          >
            Login with Github
            <i class="fa-brands fa-github text-lg"></i>
          </a>
          <!-- end Login With Github -->
        </div>

        <!-- Hamburger  -->
        <lbk-menu-one class="lg:hidden" color="black"></lbk-menu-one>
        <!-- end Hamburger  -->
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
