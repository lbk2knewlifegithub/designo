import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-test-yourself',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-dark font-bold text-2xl lg:text-3xl">
      Ideas to test yourself
    </h2>

    <ul
      class="mt-4 grid gap-2 text-sm list-inside list-disc lg:text-base lg:mt-6"
    >
      <li>
        Write your styles using a pre-processor, such as
        <a href="https://sass-lang.com/" class="underline">Sass</a> ,
        <a href="http://lesscss.org/" class="underline">Less</a> or
        <a href="http://stylus-lang.com/" class="underline">Stylus</a>
      </li>
      <li>
        Train your eye for detail by getting your solution as close to the
        design as you can
      </li>

      <li>
        Try estimating the time it will take for you to build the project. Then
        see if the time taken matches up to your estimate. Project estimations
        are a skill that is often overlooked but is important for professional
        developers
      </li>
    </ul>
  `,
})
export class TestYourselfComponent {}
