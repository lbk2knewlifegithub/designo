import { Solution } from '@lbk/fm/shared';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  @Input() solution!: Solution;

  get user() {
    return this.solution.user;
  }
}
