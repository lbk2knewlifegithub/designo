import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-wall-of-fame-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./wall-of-fame-page.component.html`,
})
export class WallOfFamePageComponent {}
