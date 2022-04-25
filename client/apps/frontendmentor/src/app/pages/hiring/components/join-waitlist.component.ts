import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-join-waitlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative container lg:max-w-[800px] lg:px-0">
      <!-- Pattern One -->
      <img
        class="z-[-1] absolute top-0 right-0 -rotate-90"
        src="assets/images/bg-pattern-desktop-1.svg"
        alt="Pattern One"
      />
      <!-- end Pattern One -->

      <div class="text-center max-w-[736px] mx-auto">
        <h2 class="text-5xl text-primary">Join our waitlist</h2>

        <p class="mt-4 md:mt-7">
          We’re in the process of building our new hiring platform. Please join
          our waitlist if you’re interested in being part of our private beta,
          gaining first access to our incredible community, and receiving an
          early bird discount.
        </p>
      </div>

      <form
        class="grid gap-4 bg-primary text-white px-5 py-6 rounded-xl mt-10 md:mt-16 md:gap-6 md:p-7 lg:gap-8 lg:p-9"
      >
        <div class="grid gap-4 md:grid-cols-2 md:gap-6">
          <!-- Full Name -->
          <label class="text-sm">
            Full Name*
            <input
              class="block w-full bg-transparent border border-white focus:border-white focus:outline-dotted focus:outline-2 focus:outline-accent"
              type="text"
            />
          </label>
          <!-- end Full Name -->

          <!-- Email -->
          <label class="text-sm">
            Email*
            <input
              class="block w-full bg-transparent border border-white focus:border-white focus:outline-dotted focus:outline-2 focus:outline-accent"
              type="email"
            />
          </label>
          <!-- end Email -->
        </div>

        <div class="grid gap-4 md:grid-cols-2 md:gap-6">
          <!-- Your Role -->
          <label class="text-sm">
            Your Role*
            <input
              class="block w-full bg-transparent border border-white focus:border-white focus:outline-dotted focus:outline-2 focus:outline-accent"
              type="text"
            />
          </label>
          <!-- end Your Role -->

          <!-- Company Name -->
          <label class="text-sm">
            Company Name*
            <input
              class="block w-full bg-transparent border border-white focus:border-white focus:outline-dotted focus:outline-2 focus:outline-accent"
              type="text"
            />
          </label>
          <!-- end Company Name -->
        </div>

        <!-- Agree to receive emails from us -->
        <div class="inline-flex items-center gap-3 text-sm lg:text-base">
          <input
            class="w-6 h-6 border-[3px] border-white bg-transparent"
            type="checkbox"
          />

          I am happy for Frontend Mentor to contact me by email
        </div>
        <!-- end Agree to receive emails from us -->

        <div class="flex justify-end">
          <button
            class="btn btn-white py-2 px-9 sm:px-10 lg:text-base lg:tracking-wider  lg:font-black lg:px-16 lg:py-3"
          >
            JOIN WAITLIST
          </button>
        </div>
      </form>
    </section>
  `,
})
export class JoinWaitlistComponent {}
