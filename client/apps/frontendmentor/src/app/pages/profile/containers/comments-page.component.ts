import { Component } from '@angular/core';

@Component({
  selector: 'lbk-profile-comments-page',
  template: `
    <main class="mb-32 md:mb-40">
      <section class="container-poll pt-20 md:pt-20">
        <!-- Title -->
        <h2 class="font-bold tracking-widest text-center sm:text-lg md:text-xl">
          ALL COMMENTS
        </h2>
        <!-- end Title -->

        <ul class="mt-8 grid gap-6 justify-items-center md:gap-8 md:mt-12">
          <li *ngFor="let item of [1, 2]">
            <lbk-activity-preview></lbk-activity-preview>
          </li>
        </ul>
      </section>
    </main>
  `,
})
export class ProfileCommentsPageComponent {}
