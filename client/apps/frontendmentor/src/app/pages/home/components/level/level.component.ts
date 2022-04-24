import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChallengeLevel } from '../../../../shared';

@Component({
  selector: 'lbk-level',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="index w-5 grid place-content-center  text-white font-bold">
      2
    </span>

    <span class="name py-[2px] px-2">{{ level }}</span>
  `,
  styleUrls: ['./level.component.scss'],
})
export class LevelComponent {
  @Input() level!: ChallengeLevel;
}
