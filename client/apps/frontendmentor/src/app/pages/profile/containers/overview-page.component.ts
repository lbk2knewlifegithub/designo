import { Component } from '@angular/core';

@Component({
  selector: 'lbk-profile-overview-page',
  template: `
    <main>
      <lbk-overview-hero></lbk-overview-hero>

      <!-- Lastest Solution  -->
      <section class="container-poll pt-14 md:mt-20">
        <h2 class="font-bold tracking-widest text-center">LASTEST SOLUTIONS</h2>
        <ul
          class="grid gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3 mt-10 md:mt-20"
        >
          <li *ngFor="let item of [1, 2, 3, 4, 5, 6]">
            <lbk-solution-preview></lbk-solution-preview>
          </li>
        </ul>

        <!-- View All Solutions -->
        <div class="mt-10">
          <a routerLink="/profile/solutions" class="link link-error"
            >View All</a
          >
        </div>
        <!-- end View All Solutions -->
      </section>
      <!-- end Lastest Solution  -->

      <!-- Latest Comments -->
      <section class="bg-secondary-50">
        <div class="container-poll mt-20 pt-20 md:pt-32 pb-20 md:pb-32">
          <h2 class="font-bold tracking-widest text-center">
            LASTEST COMMENTS
          </h2>

          <ul class="mt-8 grid gap-6 justify-items-center md:gap-8">
            <li *ngFor="let item of [1, 2]">
              <lbk-activity-preview></lbk-activity-preview>
            </li>
          </ul>

          <!-- View All Solutions -->
          <div class="mt-10">
            <a routerLink="/profile/comments" class="link link-error"
              >View All</a
            >
          </div>
          <!-- end View All Solutions -->
        </div>
      </section>
    </main>
    <!-- end Latest Comments -->
  `,
})
export class ProfileOverviewPageComponent {}
