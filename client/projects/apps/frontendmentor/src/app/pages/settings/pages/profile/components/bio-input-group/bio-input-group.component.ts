import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-bio-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="font-bold">BIO</h2>

    <ul class="mt-1 grid gap-4">
      <!-- Website -->
      <li>
        <label class="text-sm font-medium" for="website">Website</label>
        <br />

        <input
          value="e.g. https://www.youtube.com"
          class="w-full"
          id="website"
          type="text"
        />
      </li>
      <!-- end Website -->

      <lbk-bio-input></lbk-bio-input>

      <lbk-learning-input></lbk-learning-input>
    </ul>
  `,
})
export class BioInputGroupComponent {}
