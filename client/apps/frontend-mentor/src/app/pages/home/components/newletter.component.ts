import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-newletter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container pt-16 pr-10">
      <h2 class="text-sm font-bold tracking-[2px]">
        SUBSCRIBE TO OUR NEWSLETTER
      </h2>

      <p class="text-2xl font-heading font-medium leading-8 mt-4">
        Stay up-to-date with new challenges, featured solutions, selected
        articles and Frontend Mentor latest news
      </p>

      <form class="mt-4">
        <!-- Agree to receive emails from us -->
        <div class="inline-flex items-center gap-3 text-sm">
          <input class="w-6 h-6 border-[3px] border-primary" type="checkbox" />

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
          class="bg-error  py-2 px-6 text-white text-sm tracking-wide italic font-medium rounded-full"
        >
          SUBSCRIBE
        </button>
        <!-- end Submit Button -->
      </form>
    </section>
  `,
  styles: [
    `
      section {
        background-image: url('/assets/images/bg-pattern.svg');
        background-repeat: no-repeat;
        background-position: 105% 0;
        background-opacity: 50%;
      }
    `,
  ],
})
export class NewLetterComponent {}
