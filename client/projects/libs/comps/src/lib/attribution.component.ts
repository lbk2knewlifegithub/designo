import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

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
  styles: [
    `
      :host-context(.light) {
        color: white !important;
      }
    `,
  ],
})
export class AttributionComponent {
  @Input() class = '';
}

@NgModule({
  exports: [AttributionComponent],
  declarations: [AttributionComponent],
})
export class AttributionModule {}
