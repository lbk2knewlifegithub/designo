import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { DIFFICULTIES, Difficulty } from '../../models';

@Component({
  selector: 'lbk-difficulty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="index w-5 grid place-content-center  text-white font-bold">
      {{ index }}
    </span>

    <span class="name py-[2px] px-2">{{ difficulty }}</span>
  `,
  styleUrls: ['./difficulty.component.scss'],
})
export class DifficultyComponent implements OnInit {
  @Input() difficulty!: Difficulty;
  index!: number;

  @Input() class!: string;

  @HostBinding('class') get banana() {
    return `${this.class ?? ''} ${this.difficulty}`;
  }

  ngOnInit(): void {
    this.index = DIFFICULTIES[this.difficulty];
  }
}

@NgModule({
  exports: [DifficultyComponent],
  declarations: [DifficultyComponent],
})
export class DifficultyModule {}
