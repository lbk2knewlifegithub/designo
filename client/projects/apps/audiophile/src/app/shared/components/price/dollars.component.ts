import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-dollars',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p
      [ngClass]="ngClass"
      class="flex gap-2 font-bold text-lg tracking-widest {{ color }} {{
        textSize
      }}"
    >
      <!-- dollar -->
      <span class="fa fa-dollar leading-6"></span>
      <!-- end dollar -->

      <span>
        {{ dollars | number: '1.0-0' }}
      </span>
    </p>
  `,
})
export class DollarsComponent {
  @Input() dollars!: number;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color = 'text-black';

  get textSize() {
    if (this.size === 'sm') {
      return 'text-[14px]';
    }
    if (this.size === 'lg') {
      return 'text-lg';
    }

    return 'text-base';
  }

  get ngClass() {
    return {
      // gap between dollar and price number
      'gap-2': this.size === 'md',
    };
  }
}
