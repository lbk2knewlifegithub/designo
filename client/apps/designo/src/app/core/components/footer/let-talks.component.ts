import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-let-talks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section scrollTo class="container">
      <div
        class="relative  flex flex-col items-center bg-peach-200 py-[57px] px-6 rounded-xl text-white text-center md:max-h-[350px] 2xl:flex-row 2xl:px-[95px] 2xl:text-left 2xl:justify-between "
      >
        <div>
          <h2 class="text-lg font-medium md:text-xl 2xl:leading-10">
            Let’s talk about <br />
            your project
          </h2>

          <span
            class="block text-sm text-white-200 max-w-lg mt-2 md:mt-5 md:text-base"
          >
            Ready to take it to the next level? Contact us today and find out
            how our expertise can help your business grow. Get in touch
          </span>
        </div>

        <button class="btn btn-white mt-8 py-[17px] px-[18px]">
          GET IN TOUCH
        </button>
      </div>
    </section>
  `,
})
export class LetTalksComponent {}
