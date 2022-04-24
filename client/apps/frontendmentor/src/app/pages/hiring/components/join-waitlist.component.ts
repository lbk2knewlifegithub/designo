import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-join-waitlist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <div class="text-center">
        <h2 class="text-5xl text-primary">Join our waitlist</h2>

        <p class="mt-4">
          We’re in the process of building our new hiring platform. Please join
          our waitlist if you’re interested in being part of our private beta,
          gaining first access to our incredible community, and receiving an
          early bird discount.
        </p>
      </div>

      <form class="grid gap-4 bg-primary text-white px-5 py-6 rounded-xl mt-10">
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

        <!-- Agree to receive emails from us -->
        <div class="inline-flex items-center gap-3 text-sm">
          <input
            class="w-6 h-6 border-[3px] border-white bg-transparent"
            type="checkbox"
          />

          I am happy for Frontend Mentor to contact me by email
        </div>
        <!-- end Agree to receive emails from us -->

        <div class="flex justify-end">
          <button class="btn btn-white py-2 px-9">JOIN WAITLIST</button>
        </div>
      </form>
    </section>
  `,
})
export class JoinWaitlistComponent {}
