import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Include } from '../../../../../shared';

@Component({
  selector: 'lbk-include-preview-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-6 md:grid-cols-2 2xl:grid-cols-none 2xl:gap-8">
      <h3 class="font-bold text-xl uppercase md:text-2xl">In the box</h3>

      <div class="grid gap-2">
        <ng-container
          *ngFor="let include of includes; trackBy: identifyInclude"
        >
          <lbk-include-preview [include]="include"></lbk-include-preview>
        </ng-container>
      </div>
    </div>
  `,
})
export class IncludePreviewListComponent {
  @Input() includes!: Include[];

  identifyInclude(index: number, include: Include) {
    return include.item;
  }
}
