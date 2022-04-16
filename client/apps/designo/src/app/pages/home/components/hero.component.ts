import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative h-[843px] bg-peach-200 flow-root overflow-hidden">
      <div class="container mt-[80px] text-center">
        <h1 class="font-md text-white text-lg">
          Award-winning custom designs and digital branding solutions
        </h1>
        <p class="mt-[14px] text-white text-sm">
          With over 10 years in the industry, we are experienced in creating
          fully responsive websites, app design, and engaging brand experiences.
          Find out more about our services.
        </p>

        <!-- Learn More Button -->
        <button class="btn btn-white">Learn more</button>
        <!-- end Learn More Button -->
      </div>

      <!-- Circle -->
      <img
        class="absolute left-0 min-w-[640px] aspect-square  top-[10%]"
        src="assets/home/desktop/bg-pattern-hero-home.svg"
      />
      <!-- end Circle -->

      <!-- Phone -->
      <img
        class="phone absolute left-1/2 bottom-0 translate-y-[35%] -translate-x-1/2 w-[284px]"
        src="assets/home/desktop/image-hero-phone.png"
      />
      <!-- end Phone -->
    </section>
  `,
  styles: [
    `
      .phone {
        filter: drop-shadow(0px -25px 40px rgba(0, 0, 0, 0.6));
      }
    `,
  ],
})
export class HeroComponent {}
