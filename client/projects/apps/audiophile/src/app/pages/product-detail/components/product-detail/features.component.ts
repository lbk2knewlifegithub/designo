import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h4 class="font-bold text-xl uppercase md:text-2xl 2xl:text-3xl">
        Features
      </h4>

      <div
        class="text-gray-500 font-medium"
        [innerHtml]="features | features"
      ></div>
    </div>
  `,
})
export class FeaturesComponent {
  @Input() features!: string;
}
