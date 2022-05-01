import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HiremeDialogComponent } from './hire-me-dialog.component';

@Component({
  selector: 'lbk-hire-me-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Show Hire Me Dialog Button -->
    <button
      aria-label="Show Hire Me Dialog"
      type="button"
      (click)="showHireMeDialog()"
      class="absolute right-2 top-1"
    >
      <i class="fa-solid fa-exclamation-circle text-lg text-accent"></i>
    </button>
    <!-- end Show Hire Me Dialog Button-->

    <span>Disabled "Hire Me" button</span>

    <!-- Switch -->
    <lbk-switch></lbk-switch>
    <!-- end Switch -->

    <span>Enable "Hire Me" button</span>
    <span class="badge badge-primary rounded-sm">PRO</span>
  `,
  styles: [
    `
      :host {
        @apply relative flex gap-2 items-center justify-center;
        @apply bg-secondary-50 p-6 rounded-lg;
        @apply font-medium text-xs text-center;
      }
    `,
  ],
})
export class HireMeInputComponent {
  constructor(private readonly _dialogService: DialogService) {}
  showHireMeDialog() {
    this._dialogService.open(HiremeDialogComponent);
  }
}
