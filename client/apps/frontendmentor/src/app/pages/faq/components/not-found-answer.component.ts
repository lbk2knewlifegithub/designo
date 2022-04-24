import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-not-found-answer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="container bg-primary text-white text-center rounded-lg py-10"
    >
      <h2 class="font-medium text-4xl px-6">
        Didn't find an answer to your question?
      </h2>

      <p class="text-sm mt-4 px-4 leading-7">
        Contact us at hi@frontendmentor.io and we’ll get back to you as soon as
        we can. Heads up that reply times are usually slower over the weekend.
      </p>
    </section>
  `,
})
export class NotFoundAnswerComponent {}
