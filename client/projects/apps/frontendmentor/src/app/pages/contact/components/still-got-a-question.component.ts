import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-still-got-a-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="z-10 overflow-hidden relative  container bg-secondary/10 text-center rounded-xl py-10 md:py-16 lg:py-20"
    >
      <!-- Pattern  One-->
      <img
        class="hidden z-[-1] absolute top-0 left-0 md:block"
        src="assets/images/shared/bg-pattern-2.svg"
        alt="Pattern One"
      />
      <!-- end Pattern  One-->

      <!-- Pattern  Two-->
      <img
        class="hidden z-[-1] absolute bottom-0 translate-x-[40%] right-0 rotate-90 md:block"
        src="assets/images/shared/bg-pattern-1.svg"
        alt="Pattern Two"
      />
      <!-- end Pattern  Two-->

      <div class="max-w-[700px] mx-auto">
        <h2 class="font-medium text-4xl px-6">Still got a question?</h2>

        <p class="text-sm mt-4 px-4 leading-7 md:text-base">
          Contact us at hi@frontendmentor.io and we’ll get back to you as soon
          as we can. Heads up that reply times are usually slower over the
          weekend.
        </p>
      </div>
    </section>
  `,
})
export class StillGotQuestionComponent {}
