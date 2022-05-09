import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-ring',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full h-full rounded-full border border-white/30"></div>
  `,
})
export class RingComponent {}
