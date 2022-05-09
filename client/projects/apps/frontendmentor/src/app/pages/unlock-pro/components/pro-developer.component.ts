import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-pro-developer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative container-poll md:flex lg:items-center">
      <!-- Pattern Forward Slash -->
      <img
        class="hidden absolute top-0 right-0 md:block"
        src="assets/images/shared/pattern-double-forward-slash.svg"
        alt="Forward Slash"
      />
      <!-- end Pattern Forward Slash -->

      <!-- Pattern Square Bracket -->
      <img
        class="hiden absolute bottom-[-10%] left-[-10%] md:block"
        src="assets/images/shared/pattern-square-bracket.svg"
        alt="Forward Slash"
      />
      <!-- end Pattern Square Bracket -->

      <!-- Image -->
      <div
        class="z-[-1] aspect-square relative md:min-w-[443px] lg:max-w-[600px]"
      >
        <img
          src="assets/images/unlock-pro/premium-pro-developer.jpeg"
          alt="Pro Developer"
        />
      </div>
      <!-- end Image -->

      <!-- Content -->
      <div
        class="relative rounded-lg overflow-hidden shadow-sm bg-primary text-white  py-6 pt-6 pb-10 px-8 -mt-10 z-20 md:mt-0 lg:-left-[5%] lg:max-w-[500px] lg:min-h-[453px]"
      >
        <h3 class="font-medium text-2xl md:text-xl lg:text-2xl">
          Why not step into the shoes of a professional developer?
        </h3>

        <p class="mt-4 text-sm lg:text-base">
          There is no better way to practice front-end development than to use a
          realistic workflow and build projects.
          <br /><br />
          Our PRO subscription provides the highest quality resources so that
          you can...
        </p>

        <ul class="mt-4 lg:mt-6">
          <li>
            <img src="assets/images/shared/icon-check.svg" alt="Cross" />
            …learn to build fully-functional, multi-page websites with our
            premium challenges.
          </li>

          <li>
            <img src="assets/images/shared/icon-check.svg" alt="Cross" />
            ...use the original design file to see the exact styles you need for
            all our challenges.
          </li>
          <li>
            <img src="assets/images/shared/icon-check.svg" alt="Cross" />
            ...build a portfolio of projects you’ll feel proud to share.
          </li>
        </ul>
      </div>
      <!-- end Content -->
    </section>
  `,
  styles: [
    `
      ul {
        @apply grid gap-4 text-xs md:text-sm md:gap-6 lg:text-base;
        li {
          @apply flex gap-4 items-start leading-5;
          img {
            @apply min-w-[18px];
          }
        }
      }
    `,
  ],
})
export class ProDeveloperComponent {}
