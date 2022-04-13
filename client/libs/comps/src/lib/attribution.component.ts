import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-attribution',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-center text-xs">
      Challenge by
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
        >Frontend Mentor</a
      >. Coded by
      <a
        class="text-sky-600 decoration-wavy"
        href="https://github.com/lbk2knewlifegithub"
        >lbk2k</a
      >.
    </div>
  `,
})
export class AttributionComponent {}

import { NgModule } from '@angular/core';

@NgModule({
  exports: [AttributionComponent],
  declarations: [AttributionComponent],
})
export class AttributionModule {}
