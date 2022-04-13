import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1>portoflio</h1> `,
})
export class HomePageComponent {}
