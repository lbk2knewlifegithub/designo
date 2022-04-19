import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Include } from '../../../../../shared';

@Component({
  selector: 'lbk-include-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-6 items-center">
      <!-- quantity -->
      <strong class="text-primary-900">{{ include.quantity }}x</strong>
      <!-- end quantity -->

      <!-- item -->
      <p class="text-gray-500 font-medium">{{ include.item }}</p>
      <!-- end item -->
    </div>
  `,
})
export class IncludePreviewComponent {
  @Input() include!: Include;
}
