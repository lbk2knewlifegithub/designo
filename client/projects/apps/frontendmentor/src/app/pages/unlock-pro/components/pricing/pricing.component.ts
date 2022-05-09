import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-pricing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll">
      <ul
        class="grid place-items-center gap-8 md:grid-cols-3 md:gap-3  md:place-items-stretch"
      >
        <!-- Free -->
        <li class="w-full max-w-[384px] md:h-full">
          <lbk-free></lbk-free>
        </li>
        <!-- end Free -->

        <!-- Yearly -->
        <li class="w-full max-w-[384px] md:h-full">
          <lbk-yearly></lbk-yearly>
        </li>
        <!-- end Yearly -->

        <!-- Monthly -->
        <li class="w-full max-w-[384px] md:h-full">
          <lbk-monthly></lbk-monthly>
        </li>
        <!-- end Monthly -->
      </ul>
    </section>
  `,
})
export class PricingComponent {}
