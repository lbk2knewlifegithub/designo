import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-solutions-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./solutions-page.component.html`,
})
export class SolutionsPageComponent {}
