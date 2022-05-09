import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-aspiring-developer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative container-poll md:flex lg:items-center">
      <!-- Three Curly Brackets -->
      <img
        class="absolute top-0 -left-[10%]"
        src="assets/images/shared/pattern-three-curly-brackets.svg"
        alt="Three Curly Brackets"
      />
      <!-- end Three Curly Brackets -->

      <!-- Aspiring Developer Image -->
      <div
        class="z-[-1] aspect-square relative md:order-last md:min-w-[443px] lg:max-w-[600px]"
      >
        <img
          src="assets/images/unlock-pro/premium-aspiring-developer.jpeg"
          alt="Aspiring Developer"
        />
      </div>
      <!-- end Aspiring Developer Image -->

      <!-- Content -->
      <div
        class="relative rounded-xl overflow-hidden shadow-sm bg-secondary-50  py-6 pt-6 pb-10 px-8 -mt-10 z-20 md:mt-0 md:pb-14 lg:-right-[5%] lg:max-w-[500px] lg:min-h-[465px] lg:pb-0"
      >
        <!-- Pattern Greater Than  -->
        <img
          class="absolute bottom-[10%] left-0"
          src="assets/images/shared/pattern-greater-than.svg"
          alt="Pattern Greater Than"
        />
        <!-- end Pattern Greater Than  -->
        <h3 class="font-medium text-2xl">Tutorials can only take you so far</h3>

        <div class="text-dark/70 mt-4 ">
          <p class="text-sm lg:text-base">
            Tutorials are an amazing way to learn the theory of web development.
            But there comes a time when you need to take action and put that
            knowledge to the test.<br /><br />
            Have you ever felt like...
          </p>

          <ul class="mt-4">
            <li>
              <img src="assets/images/shared/icon-cross.svg" alt="Cross" />
              ...you're caught in a never ending cycle of jumping from tutorial
              to tutorial without internalizing what you've been taught?
            </li>

            <li>
              <img src="assets/images/shared/icon-cross.svg" alt="Cross" />
              ...you only remember the surface-level concepts and forget all the
              good stuff?
            </li>
            <li>
              <img src="assets/images/shared/icon-cross.svg" alt="Cross" />
              ...you rely on following code alongs to build projects and
              struggle when it comes to doing it yourself?
            </li>
          </ul>
        </div>
      </div>
      <!-- end Content -->
    </section>
  `,
  styles: [
    `
      ul {
        @apply grid gap-4 text-xs md:text-sm md:gap-5 lg:text-base;
        li {
          @apply flex gap-4 items-start leading-5 lg:leading-6;
          img {
            @apply w-[15px];
          }
        }
      }
    `,
  ],
})
export class AspiringDeveloperComponent {}
