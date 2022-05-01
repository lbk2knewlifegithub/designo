import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-bio-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="text-sm font-medium" for="bio">BIo</label>
    <br />

    <textarea
      value="e.g. https://www.youtube.com"
      class="w-full"
      id="bio"
      rows="10"
      type="text"
    ></textarea>

    <div class="text-xs text-right">
      Characters remainig: <strong>300</strong>
    </div>
  `,
})
export class BioInputComponent {}
