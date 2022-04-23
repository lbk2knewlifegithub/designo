import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  selector: 'lbk-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      *ngIf="loading; else loaded"
      class="animate-spin  block"
      style="color: rgba(0, 0, 255, 0.8);"
      [style]="{
        width: radius + 'px',
        height: radius + 'px'
      }"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="#e6e6e6"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <ng-template #loaded> <ng-content></ng-content> </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
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

  @Input() loading?: boolean;
}

@NgModule({
  imports: [CommonModule],
  exports: [SpinnerComponent],
  declarations: [SpinnerComponent],
})
export class SpinnerModule {}
