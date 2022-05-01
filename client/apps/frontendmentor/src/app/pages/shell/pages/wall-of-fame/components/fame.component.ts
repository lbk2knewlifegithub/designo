import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Fame } from '../models';

@Component({
  selector: 'lbk-fame',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-ribbon class="absolute z-10 w-16 h-16 right-0 top-0"> </lbk-ribbon>

    <lbk-image
      [singleImage]="fame.image"
      classImage="w-[50px] aspect-square rounded-full"
      [alt]="fame.name"
    ></lbk-image>

    <div class="text-xs">
      <!-- Name -->
      <h3 class="text-sm font-bold">{{ fame.name }}</h3>
      <!-- end Name -->

      <!-- username -->
      <span class="text-secondary"> @{{ fame.username }} </span>
      <!-- end username -->

      <!-- Points -->
      <h3 class="font-bold text-primary text-sm">{{ fame.points | number }}</h3>
      <!-- end Points -->
    </div>
  `,
  styles: [
    `
      :host {
        @apply flex gap-4 items-center;
        @apply relative rounded-lg overflow-hidden bg-white border shadow-sm p-4 md:p-5;
      }
    `,
  ],
})
export class FameComponent {
  @Input() fame!: Fame;
}
