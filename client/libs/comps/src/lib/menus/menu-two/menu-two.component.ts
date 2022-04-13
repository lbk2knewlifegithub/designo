import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'lbk-menu-two',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button aria-label="Hamburger Menu">
      <svg
        [class.shown]="shown"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        stroke-width="5"
        [style.width]="radius"
      >
        <path
          class="top"
          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
        />
        <path class="middle" d="m 30,50 h 40" />
        <path
          class="bottom"
          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
        />
      </svg>
    </button>
  `,
  styleUrls: ['./menu-two.component.scss'],
})
export class MenuTwoComponent {
  @Input() shown!: boolean;
  @Input() radius = '50px';
}

@NgModule({
  imports: [CommonModule],
  exports: [MenuTwoComponent],
  declarations: [MenuTwoComponent],
})
export class MenuTwoModule {}
