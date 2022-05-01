import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-solution-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./solution-page.component.html`,
})
export class SolutionPageComponent {}
