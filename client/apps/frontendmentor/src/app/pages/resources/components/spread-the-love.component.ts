import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-spread-the-love',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative container ">
      <!-- Pattern Dots One-->
      <img
        class="absolute bottom-0 right-[10%] translate-y-1/2"
        src="assets/images/shared/pattern-dots.svg"
        alt="Pattern Dots One"
      />
      <!-- end Pattern Dots One-->

      <!-- Pattern Dots Two-->
      <img
        class="absolute bottom-0 left-[10%] translate-y-1/2"
        src="assets/images/shared/pattern-dots.svg"
        alt="Pattern Dots Two"
      />
      <!-- end Pattern Dots Two-->

      <!-- Pattern Square Bracket -->
      <img
        class="absolute bottom-0 left-0 -translate-x-1/2"
        src="assets/images/shared/pattern-square-bracket.svg"
        alt="Pattern Square Bracket"
      />
      <!-- end Pattern Square Bracket -->

      <!-- Pattern Three Curly  Brackets -->
      <img
        class="absolute top-0 left-0 -translate-x-8 md:translate-x-0 md:left-[20%] rotate-180"
        src="assets/images/shared/pattern-three-curly-brackets.svg"
        alt="Pattern Three Curly Brackets"
      />
      <!-- end Pattern Square Bracket -->

      <div
        class="z-10 bg-secondary-50 rounded-xl py-24 text-center flex flex-col gap-10 items-center lg:pt-20 lg:pb-32"
      >
        <!-- Content -->
        <div>
          <h2 class="font-black tracking-[.3rem]">SPREAD THE LOVE</h2>

          <h3 class="font-medium text-3xl mt-6">
            Know someone who might find this list useful? Share it around!
          </h3>
        </div>
        <!-- end Content -->

        <!-- Socials -->
        <lbk-socials class="skip-linkedin lg"></lbk-socials>
        <!-- end Socials -->
      </div>
    </section>
  `,
})
export class SpreadTheLoveComponent {}
