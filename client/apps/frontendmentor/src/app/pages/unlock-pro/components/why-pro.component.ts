import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-why-pro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative container-poll md:flex lg:grid lg:grid-cols-2">
      <!-- Pattern Three Curcly Brackets -->
      <img
        class="hiden absolute top-0 left-0 z-10 -translate-y-1/2 md:block"
        src="assets/images/shared/pattern-three-curly-brackets.svg"
        alt="Pattern Three Curly Bracket"
      />
      <!-- end Pattern Three Curly Brackets -->

      <!-- Pattern Square Bracket -->
      <img
        class="hidden absolute bottom-0 left-[30%] z-10 translate-y-1/2 md:block"
        src="assets/images/shared/pattern-dots.svg"
        alt="Pattern Dots"
      />
      <!-- end Pattern Square Bracket -->

      <!-- Image -->
      <div class="md:order-last">
        <img
          class="z-[-1] relative md:min-w-[364px]"
          src="assets/images/unlock-pro/profile-matt.jpeg"
          alt="Matt"
        />
      </div>
      <!-- end Image -->

      <!-- Content -->
      <div
        class="grid place-content-center rounded-lg overflow-hidden shadow-sm bg-[#F0F4F4]  py-6 pt-6 pb-10 px-8 -mt-10 z-10 md:mt-0 md:pb-16 lg:py-0 xl:px-20"
      >
        <h3 class="font-medium text-2xl">Why Frontend Mentor PRO?</h3>

        <p class="mt-4 text-sm text-dark/80 lg:text-base">
          There is no better way to practice front-end development than to build
          projects using a realistic workflow.
          <br /><br />
          Our PRO subscription lets you do that with the highest quality
          projects and most realistic workflow possible.
          <br /><br />
          Whether you're looking for your first role or trying to get a
          promotion our PRO subscription will give you the tools to grow your
          skillset.
          <br /><br />
          I hope you enjoy building our projects!
          <br /><br />

          <strong> - Matt Studdert </strong>
        </p>
      </div>
      <!-- end Content -->
    </section>
  `,
})
export class WhyProDeveloperComponent {}
