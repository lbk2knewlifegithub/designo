import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1>I am superhero</h1> `,
})
export class HeroComponent {}
