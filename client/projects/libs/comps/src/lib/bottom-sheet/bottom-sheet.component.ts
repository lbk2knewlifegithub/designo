import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { slideInDown, slideOutUp } from '@lbk/anims';

@Component({
  selector: 'lbk-bottom-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="shown"
      class="fixed inset-0 flex items-start justify-center bg-opacity-0 pointer-events-none"
    >
      <div @slideInDown @slideOutUp class="inline-block pointer-events-auto">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    // Overlay Animations
    slideInDown(),
    slideOutUp(),
  ],
})
export class BottomSheetComponent {
  @Input() shown!: boolean;
}

@NgModule({
  imports: [CommonModule],
  exports: [BottomSheetComponent],
  declarations: [BottomSheetComponent],
})
export class BottomSheetModule {}
