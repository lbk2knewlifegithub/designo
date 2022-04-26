import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hire-me-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Image -->
    <div class="lg:min-w-[535px] lg:order-last">
      <img
        src="assets/images/unlock-pro/image-hire-me-demo.gif"
        alt="Image Hire Me Demo"
      />
    </div>
    <!-- end Image -->

    <!-- Content -->
    <div class="lg:min-w-[412px] lg:max-w-[515px] lg:mt-4">
      <h4 class="font-black text-sm text-primary tracking-widest md:text-base">
        HIRE ME BUTTON
      </h4>

      <h3 class="font-medium text-xl md:text-2xl">
        Show potential employers you’re available for work
      </h3>

      <p class="text-dark/80 text-sm mt-4 md:text-base">
        Your Frontend Mentor profile is the perfect way to showcase your
        front-end work and your knowledge.
        <br />
        <br />
        The “Hire Me” button allows hiring managers to contact you through the
        platform to discuss work opportunities. Simply switch it on in your
        profile settings!
      </p>
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
export class HireMeButtonComponent {}
