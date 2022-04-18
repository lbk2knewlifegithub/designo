import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-let-talks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section scrollTo class="container">
      <div
        class="relative overflow-hidden z-10 flex flex-col items-center bg-peach-200 py-[57px] px-6 rounded-xl text-white text-center md:max-h-[350px] lg:flex-row lg:px-[95px] lg:text-left lg:justify-between"
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

        <!-- Get In Touch Link -->
        <a routerLink="/contact" class="btn btn-white mt-8 py-[17px] px-[18px]">
          GET IN TOUCH
        </a>
        <!-- end Get In Touch Link -->

        <!-- Pattern Circle-->
        <img
          class="absolute right-0 bottom-0 scale-[200%] z-[-1]"
          src="assets/shared/desktop/bg-pattern-call-to-action.svg"
          alt="Pattern"
        />
        <!-- end Pattern Circle-->
      </div>
    </section>
  `,
})
export class LetTalksComponent {}
