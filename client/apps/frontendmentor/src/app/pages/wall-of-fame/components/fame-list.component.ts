import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Fame, identifyFame } from '../models';

@Component({
  selector: 'lbk-fame-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul
      class="grid gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-5 xl:grid-cols-5"
    >
      <li *ngFor="let fame of fames; trackBy: identifyFame; index as i">
        <lbk-fame [classList]="i + 1 | longNumber" [fame]="fame"></lbk-fame>
      </li>
    </ul>
  `,
})
export class FameListComponent {
  @Input() fames!: Fame[];
  identifyFame = identifyFame;
}
