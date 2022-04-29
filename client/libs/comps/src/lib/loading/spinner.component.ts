import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule
} from '@angular/core';

@Component({
  selector: 'lbk-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="loading-wrapper" *ngIf="loading; else loaded">
      <svg
        class="animate-spin block"
        [ngStyle]="{
          width: radius + 'px',
          height: radius + 'px'
        }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#000eea"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="#e6e6e6"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <ng-template #loaded> <ng-content></ng-content> </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      :host-context(.center) {
        .loading-wrapper {
          @apply w-full flex justify-center mt-20 mb-32;
        }
      }
    `,
  ],
})
export class SpinnerComponent {
  /**
   * - Dimension  unit px
   */
  @Input()
  radius = 20;

  @Input() loading: boolean | undefined | null;
}

@NgModule({
  imports: [CommonModule],
  exports: [SpinnerComponent],
  declarations: [SpinnerComponent],
})
export class SpinnerModule {}
