import { Component, Input } from '@angular/core';
import { Solution } from '@lbk/fm/shared';

@Component({
  selector: 'lbk-design-comparison',
  template: `
    <section class="container-poll pt-16 md:pt-20 xl:pt-32">
      <h2 class="font-bold text-center xl:text-lg">DESIGN COMPARISON</h2>

      <div
        class="text-xs text-secondary flex items-center gap-4 justify-center mt-8 md:mt-12 xl:hidden"
      >
        SOLUTION

        <div class="relative w-20 h-[1px] bg-dark">
          <span
            class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-4 w-[1px] bg-dark"
          ></span>
        </div>

        DESIGN
      </div>

      <div class="relative block mt-6 md:mt-8 xl:mt-12 xl:flex xl:items-start">
        <div class="hidden gap-2 items-center mt-4 xl:inline-flex">
          SOLUTION
          <span class="w-8 bg-black h-[1px]"></span>
        </div>

        <lbk-image-compare></lbk-image-compare>

        <div class="hidden gap-2 items-center mt-4 xl:inline-flex">
          <span class="w-8 bg-black h-[1px]"></span>
          DESIGN
        </div>
      </div>

      <lbk-want-screenshot
        class="mt-8 max-w-[600px] mx-auto md:mt-12"
      ></lbk-want-screenshot>
    </section>
  `,
})
export class DesignComparisonComponent {
  @Input() solution!: Solution;
}
