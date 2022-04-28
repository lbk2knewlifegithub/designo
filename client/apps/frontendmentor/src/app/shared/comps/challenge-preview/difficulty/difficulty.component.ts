import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Difficulty } from '../../../models';

@Component({
  selector: 'lbk-difficulty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="index w-5 grid place-content-center  text-white font-bold">
      2
    </span>

    <span class="name py-[2px] px-2">{{ difficulty }}</span>
  `,
  styleUrls: ['./difficulty.component.scss'],
})
export class DifficultyComponent {
  @Input() difficulty!: Difficulty;
}
