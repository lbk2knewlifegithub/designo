import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-live-site-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      <strong class="text-xs md:text-sm"> Live site URL* </strong>
      <p class="text-xs text-secondary italic md:text-sm md:mt-1">
        Read more about our
        <a routerLink="/">recommended free hosting options.</a>
      </p>
      <input class="w-full mt-1" type="text" />
    </label>
  `,
})
export class LiveSiteInputComponent {}
