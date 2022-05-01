import { Component } from '@angular/core';

@Component({
  selector: 'lbk-profile-solutions-page',
  template: `
    <main class="mb-32">
      <section class="container-poll pt-14 sm:pt-20 md:pt-28 flow-root">
        <!-- Title -->
        <h2 class="font-bold tracking-widest text-center sm:text-lg md:text-xl">
          ALL SOLUTIONS
        </h2>
        <!-- end Title -->

        <ul
          class="grid gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3 mt-10 sm:mt-14 md:mt-20"
        >
          <li *ngFor="let item of [1, 2, 3, 4, 5, 6]">
            <lbk-solution-preview></lbk-solution-preview>
          </li>
        </ul>
      </section>
    </main>
  `,
})
export class ProfileSolutionsPageComponent {}
