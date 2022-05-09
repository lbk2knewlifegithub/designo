import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-not-found-answer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="z-10 overflow-hidden relative max-w-[1200px] container bg-primary text-white text-center rounded-xl py-10 md:py-16 sm:px-10 lg:py-20 lg:px-0"
    >
      <!-- Pattern  Two-->
      <img
        class="z-[-1] absolute top-0 -translate-y-[43%] lg:-translate-y-[45%] object-cover min-w-[850px]"
        src="assets/images/bg-pattern-desktop-1.svg"
        alt="Pattern One"
      />
      <!-- end Pattern  One-->

      <div class="max-w-[700px] mx-auto">
        <h2 class="font-medium text-4xl px-6">
          Didn't find an answer to your question?
        </h2>

        <p class="text-sm mt-4 px-4 leading-7">
          Contact us at hi@frontendmentor.io and we’ll get back to you as soon
          as we can. Heads up that reply times are usually slower over the
          weekend.
        </p>
      </div>
    </section>
  `,
})
export class NotFoundAnswerComponent {}
