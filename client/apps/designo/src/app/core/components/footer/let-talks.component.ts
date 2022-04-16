import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-let-talks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <div
        class="relative bg-peach-200 py-16 px-6 rounded-xl text-white text-center"
      >
        <h2 class="text-lg">
          Let’s talk about <br />
          your project
        </h2>

        <span class="block text-sm text-white-200 mt-2">
          Ready to take it to the next level? Contact us today and find out how
          our expertise can help your business grow. Get in touch
        </span>

        <button class="btn btn-white mt-8 py-[17px] px-[18px]">
          GET IN TOUCH
        </button>
      </div>
    </section>
  `,
})
export class LetTalksComponent {}
