import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {}
