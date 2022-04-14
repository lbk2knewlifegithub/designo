import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { slideInDown, slideOutUp, zoomIn } from '@lbk/anims';

@Component({
  selector: 'lbk-open-the-door-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="shown"
      @slideInDown
      @slideOutUp
      class="fixed inset-0 bg-white grid place-items-center z-50"
    >
      <img @zoomIn src="assets/loading.gif" alt="Loading" />
    </div>
  `,
  animations: [
    // Slides
    slideInDown(),
    slideOutUp(),
    // Zoom
    zoomIn({ delay: 300 }),
  ],
})
export class OpenTheDoorLoadingComponent {
  @Input() shown!: boolean;
}

@NgModule({
  imports: [CommonModule],
  declarations: [OpenTheDoorLoadingComponent],
  exports: [OpenTheDoorLoadingComponent],
})
export class OpenTheDoorLoadingModule {}
