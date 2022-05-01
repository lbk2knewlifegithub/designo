import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-file-access',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Image -->
    <div class="lg:min-w-[535px]">
      <img
        src="assets/images/unlock-pro/image-sketch-demo.gif"
        alt="Image Sketch Demo"
      />
    </div>
    <!-- end Image -->

    <!-- Content -->
    <div class="lg:min-w-[412px] lg:max-w-[515px] lg:mt-4 lg:pr-8 xl:pr-0">
      <h4 class="font-black text-sm text-primary tracking-widest md:text-base">
        DESIGN FILE ACCESS
      </h4>

      <h3 class="font-medium text-xl md:text-2xl">
        See exactly what styles you need by using the original design file
      </h3>

      <p class="text-dark/80 text-sm mt-4 md:text-base">
        Professional developers use design files to help them see exactly what
        colors, fonts, etc. a project requires.
      </p>

      <ul class="list-inside list-disc text-sm space-y-2 mt-4 md:text-base">
        <li>
          <strong>Sketch and Figma designs</strong>
          - We provide both Sketch and Figma designs for every challenge. So you
          can choose which tool you prefer to use.
        </li>

        <li>
          <strong>Full access</strong>
          - Get access to the original design for both free and premium
          challenges.
        </li>
      </ul>
    </div>
    <!-- end Content -->
  `,
  styles: [
    `
      :host {
        @apply flex flex-col gap-16 lg:gap-12 lg:flex-row lg:items-center;
      }
    `,
  ],
})
export class FileAccessComponent {}
