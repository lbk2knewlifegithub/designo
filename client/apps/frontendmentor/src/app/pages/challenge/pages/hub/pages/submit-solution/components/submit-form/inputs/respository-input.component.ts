import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-repository-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label>
      <strong class="text-xs md:text-sm"> Respository URL* </strong>
      <input class="w-full mt-1" type="text" />
    </label>
  `,
})
export class RepositoryURLComponent {}
