import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="container pt-16 border-t-4 sm:border-t sm:border-black ">
      <ul class="flex flex-col gap-10 md:justify-between md:flex-row">
        <li class="text-xs md:text-sm md:min-w-[200px]">
          <h2 class="font-bold">FRONTEND MENTOR</h2>

          <p class="mt-4 max-w-md md:text-xs md:leading-5 md:max-w-[150px]">
            Gain real experience of building websites and providing code
            reviews. Build your portfolio and help others achieve their goals.
          </p>
        </li>

        <ul class="grid gap-10 md:grid-cols-2 md:grow">
          <!-- Explore -->
          <li>
            <lbk-explore></lbk-explore>
          </li>
          <!-- end Explore -->

          <!-- Community -->
          <li>
            <lbk-community></lbk-community>
          </li>
          <!-- end Community -->
        </ul>

        <!-- Socials -->
        <li>
          <lbk-socials></lbk-socials>
        </li>
        <!-- end Socials -->
      </ul>

      <!-- Copyright -->
      <lbk-copyright class="block mt-16 md:mt-32"></lbk-copyright>
      <!-- end Copyright -->
    </footer>
  `,
})
export class FooterComponent {}
