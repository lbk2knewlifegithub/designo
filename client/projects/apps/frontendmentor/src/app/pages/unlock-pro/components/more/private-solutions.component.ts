import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-private-solutions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Pattern Three Curly Brackets  -->
    <img
      class="absolute top-0 left-0 -translate-x-[120%] -translate-y-full"
      src="assets/images/shared/pattern-three-curly-brackets.svg"
      alt="Pattern Three Curly Brackets"
    />
    <!-- end Pattern Three Curly Brackets  -->

    <!-- Image -->
    <div class="lg:min-w-[535px] lg:order-last">
      <img
        src="assets/images/unlock-pro/image-private-demo.gif"
        alt="Image Sketch Demo"
      />
    </div>
    <!-- end Image -->

    <!-- Content -->
    <div class="lg:min-w-[412px] lg:max-w-[515px] lg:mt-4">
      <h4 class="font-black text-sm text-primary tracking-widest md:text-base">
        PRIVATE SOLUTIONS
      </h4>

      <h3 class="font-medium text-xl md:text-2xl">
        Choose whether you keep your solutions public or make them private
      </h3>

      <p class="text-dark/80 text-sm mt-4 md:text-base">
        You get to decide exactly who sees your solutions. If you’d prefer to
        keep them private, no problem!
      </p>

      <ul class="list-inside list-disc text-sm space-y-2 mt-4 md:text-base">
        <li>
          <strong> Hidden throughout the site </strong>
          - Private solutions don’t show up around the site until you make them
          public.
        </li>

        <li>
          <strong>Choose who sees it</strong>
          - Nobody will be able to guess your solution URL. But you can still
          share it with whoever you like.
        </li>
      </ul>
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
export class PrivateSolutionsComponent {}
