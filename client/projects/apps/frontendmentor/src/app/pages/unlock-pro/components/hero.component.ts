import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative container grid place-items-center text-center overflow-hidden pt-16 lg:pt-28"
    >
      <!-- Bg Pattern Mobile -->
      <img
        class="z-[-1] absolute -right-[2%] -translate-y-[30%] h-full md:-translate-y-[10%] md:right-[10%] lg:hidden"
        src="/assets/images/shared/bg-pattern.svg"
        alt="Pattern"
      />
      <!-- end Bg Pattern Mobile -->

      <!-- Bg Pattern Desktop One -->
      <img
        class="hidden z-[-1] absolute rotate-45 left-[10%] -translate-x-1/2 h-full lg:block"
        src="/assets/images/shared/bg-pattern-1.svg"
        alt="Pattern"
      />
      <!-- end Bg Pattern Desktop One -->

      <!-- Bg Pattern Desktop Two -->
      <img
        class="hidden z-[-1] absolute -right-[5%] -rotate-45 -translate-y-[30%] h-full md:-translate-y-[10%] lg:block"
        src="/assets/images/shared/bg-pattern-2.svg"
        alt="Pattern"
      />
      <!-- end Bg Pattern Desktop Two -->

      <h1
        class="text-4xl max-w-[598px] text-primary md:text-5xl md:leading-[4rem]"
      >
        So you want to be a pro developer
      </h1>

      <p
        class="mt-20 px-6 max-w-[475px] sm:mt-16 md:mt-20 lg:max-w-[562px] lg:mt-12"
      >
        Our PRO subscription lets you step into the shoes of a professional
        developer.
        <br />
        <br />
        Get access to our premium challenges with multi-page designs for mobile,
        tablet, and desktop screens. See the detail in each design with access
        to Sketch and Figma designs for every challenge. Plus more!
        <br />
        <br />
        Already sold?
      </p>

      <!-- Unlock Now -->
      <button
        class="btn btn-error px-12 italic font-black tracking-widest mt-6"
      >
        UNLOCK PRO NOW
      </button>
      <!-- end Unlock Now -->
    </section>
  `,
})
export class HeroComponent {}
