import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'lbk-more',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container-poll">
      <div
        class="text-center px-6 max-w-[474px] mx-auto md:px-0 lg:max-w-[650px]"
      >
        <h3 class="text-sm font-bold tracking-[0.16rem] lg:text-base">
          BUT WAIT, THERE'S MORE!
        </h3>
        <p class="mt-1 text-sm leading-6 text-dark/80 lg:mt-3">
          Cringey infomercial headline aside, we have a bunch of extra features
          beyond access to our premium challenges to help you practice.
        </p>
      </div>

      <ul
        class="grid gap-32 mx-auto mt-20 max-w-[547px] md:mt-24 lg:max-w-none lg:gap-48"
      >
        <li>
          <lbk-file-access></lbk-file-access>
        </li>

        <li>
          <lbk-private-solutions></lbk-private-solutions>
        </li>

        <li>
          <lbk-unlimited-screenshots></lbk-unlimited-screenshots>
        </li>

        <li>
          <lbk-hire-me-button></lbk-hire-me-button>
        </li>
      </ul>
    </section>
  `,
})
export class MoreComponent {}
