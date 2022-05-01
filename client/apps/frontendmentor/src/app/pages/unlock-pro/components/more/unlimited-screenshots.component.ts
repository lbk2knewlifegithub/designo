import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-unlimited-screenshots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Pattern Dots-->
    <img
      class="absolute top-0 right-[15%] -translate-y-full"
      src="assets/images/shared/pattern-dots.svg"
      alt="Pattern Dots"
    />
    <!-- end Pattern Dots -->

    <!-- Image -->
    <div class="lg:min-w-[535px]">
      <img
        src="assets/images/unlock-pro/image-comparison-demo.gif"
        alt="Image Comparison Demo"
      />
    </div>
    <!-- end Image -->

    <!-- Content -->
    <div class="lg:min-w-[412px] lg:max-w-[515px] lg:mt-4 lg:pr-8 xl:pr-0">
      <h4 class="font-black text-sm text-primary tracking-widest md:text-base">
        UNLIMITED SOLUTION SCREENSHOTS
      </h4>

      <h3 class="font-medium text-xl md:text-2xl">
        Present your solution in the best light possible
      </h3>

      <p class="text-dark/80 text-sm mt-4 md:text-base">
        Whenever you submit your solution, we take a screenshot of your project.
        This lets you compare how close you got to the design.
        <br />
        <br />

        With unlimited screenshots, you can take new screenshots whenever you
        update your code. So you can be sure your solution is always showing off
        your latest edits.
      </p>
    </div>
    <!-- end Content -->
  `,
  styles: [
    `
      :host {
        @apply relative flex flex-col gap-16 lg:gap-12 lg:flex-row lg:items-center;
      }
    `,
  ],
})
export class UnlimitedScreenshotsComponent {}
