import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-title-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      <strong class="text-xs md:text-sm"> Solution title* </strong>
      <p class="text-xs text-secondary italic md:text-sm md:mt-1">
        Include some of the tools and techniques you used to complete the
        challenge.
      </p>
      <input
        class="w-full mt-1"
        placeholder="e.g. Responsive landing page using CSS Grid"
        type="text"
      />
      <p class="text-right text-xs mt-1">
        Characters remaining : <strong>70</strong>
      </p>
    </label>
  `,
})
export class TitleInputComponent {}
