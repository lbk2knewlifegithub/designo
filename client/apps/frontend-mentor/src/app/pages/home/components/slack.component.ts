import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-slack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <div
        class="z-10 bg-primary relative grid place-items-center text-white bg-primary rounded-md pt-9 px-8 pb-16 overflow-hidden md:pb-32"
      >
        <!-- Logo Slack -->
        <img
          class="max-w-[175px]"
          src="assets/images/logo-slack.svg"
          alt="Slack"
        />
        <!-- end Logo Slack -->

        <div class="mt-6 text-center md:mt-8">
          <h3 class="font-heading font-bold text-sm tracking-widest">
            JOIN OUR SLACK COMMUNITY
          </h3>

          <p class="text-2xl mt-4 leading-8 md:mt-8">
            Join over 100,000 people taking the challenges, talking about their
            code, helping each other, and chatting about all things front-end!
          </p>
        </div>

        <!-- Request Invite -->
        <form class="mt-6 w-full px-6 grid place-items-center max-w-md">
          <input
            class="bg-transparent border border-white w-full text-secondary text-white placeholder-white/80"
            placeholder="email@example.com"
            type="email"
          />
          <!-- Submit Button -->
          <button
            class="bg-white py-2 px-6 rounded-full font-medium italic text-primary text-sm md:mt-1"
          >
            REQUEST INVITE
          </button>
          <!-- end Submit Button -->
        </form>
        <!-- end Request Invite -->

        <!-- Slack Pattern  -->
        <img
          class="absolute bottom-0 right-0 scale-[250%] translate-x-[25%] translate-y-[25%] opacity-10 z-[-1] md:translate-x-[10%] md:translate-y-[10%]"
          src="assets/images/slack-pattern.svg"
          alt="Slack Pattern"
        />
        <!-- end Slack Pattern  -->
      </div>
    </section>
  `,
})
export class SlackComponent {}
