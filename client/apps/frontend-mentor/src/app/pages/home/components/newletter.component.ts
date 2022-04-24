import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-newletter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative container overflow-hidden pt-16 pr-10 z-10 md:pt-24 md:grid md:grid-cols-2 md:gap-10 md:place-items-end"
    >
      <!-- Pattern Mobile-->
      <img
        class="z-[-1] absolute top-[-20px] -right-[5%] md:hidden"
        src="assets/images/bg-pattern.svg"
        alt="Pattern"
      />
      <!-- end Pattern Mobile-->

      <!-- Pattern Tablet-->
      <img
        class="hidden z-[-1] absolute top-[-20px] -right-[20%] opacity-30 md:block"
        src="assets/images/bg-pattern-newletter.svg"
        alt="Pattern"
      />
      <!-- end Pattern Table-->

      <div>
        <h2 class="text-sm font-bold tracking-[2px]">
          SUBSCRIBE TO OUR NEWSLETTER
        </h2>

        <p
          class="text-2xl font-heading font-medium leading-8 mt-4 max-w-xl md:mt-6"
        >
          Stay up-to-date with new challenges, featured solutions, selected
          articles and Frontend Mentor latest news
        </p>

        <form class="mt-4 max-w-md md:mt-6">
          <!-- Agree to receive emails from us -->
          <div class="inline-flex items-center gap-3 text-sm">
            <input
              class="w-6 h-6 border-[3px] border-primary"
              type="checkbox"
            />

            I am happy for Frontend Mentor to contact me by email
          </div>
          <!-- end Agree to receive emails from us -->

          <!-- Email Input -->
          <div class="mt-4">
            <input
              class="border w-full"
              type="email"
              placeholder="example@example.com"
            />
          </div>
          <!-- end Email Input -->

          <!-- Submit Button -->
          <button
            class="bg-error  py-2 px-6 text-white text-sm tracking-wide italic font-medium rounded-full md:mt-1"
          >
            SUBSCRIBE
          </button>
          <!-- end Submit Button -->
        </form>
      </div>

      <!-- Illustration -->
      <img src="assets/images/illustration-desk.svg" alt="Illustration Desk" />
      <!-- end Illustration -->
    </section>
  `,
})
export class NewLetterComponent {}
