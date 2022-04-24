import { Component } from '@angular/core';

@Component({
  selector: 'lbk-copyright',
  template: `
    <section
      class="container flex flex-col gap-3 text-xs text-secondary pt-6  pb-4  sm:flex-row sm:justify-between sm:items-center sm:py-4 md:py-5 lg:py-6 2xl:px-28"
    >
      <p>© Frontend Mentor 2019 - 2022</p>

      <ul class="flex gap-4 mt-3 md:gap-6">
        <li>
          <a href=""> Terms </a>
        </li>

        <li>
          <a href=""> Cookie </a>
        </li>

        <li>
          <a href="">Privacy Policy</a>
        </li>

        <li>
          <a href=""> License </a>
        </li>
      </ul>
    </section>
  `,
})
export class CopyrightComponent {}
