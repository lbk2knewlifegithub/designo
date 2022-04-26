import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-dark">
      <div class="container pt-16 2xl:px-28">
        <ul
          class="flex flex-col gap-10 md:justify-between md:flex-row lg:gap-24"
        >
          <li class="text-xs md:text-sm md:min-w-[200px]">
            <h2 class="font-bold">FRONTEND MENTOR</h2>

            <p
              class="mt-4 max-w-md md:text-xs md:leading-5 md:max-w-[150px] lg:max-w-none lg:text-sm"
            >
              Gain real experience of building websites and providing code
              reviews. Build your portfolio and help others achieve their goals.
            </p>
          </li>

          <li class="md:grow lg:w-full">
            <ul
              class="flex flex-col gap-10 max-w-lg md:justify-start  md:flex-row md:gap-20 lg:gap-32"
            >
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
          </li>

          <!-- Socials -->
          <li>
            <lbk-socials></lbk-socials>
          </li>
          <!-- end Socials -->
        </ul>
      </div>

      <!-- Copyright -->
      <lbk-copyright
        class="block border-t-4 sm:border-t sm:border-black mt-16 md:mt-32 lg:mt-24"
      ></lbk-copyright>
      <!-- end Copyright -->
    </footer>
  `,
})
export class FooterComponent {}
