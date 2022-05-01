import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { AboutPrivateSolutionsComponent } from '../../about-private-solution.component';

@Component({
  selector: 'lbk-private-solution-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="relative bg-secondary-50 py-8 px-6 rounded-lg font-medium flex items-center justify-center gap-4 text-sm"
    >
      <!-- Info Icon -->
      <button
        (click)="showAboutPrivateSolution()"
        aria-label="Learn about private solution"
        class="text-accent absolute right-2 top-1"
      >
        <i class="fa-solid fa-exclamation-circle text-lg"></i>
      </button>
      <!-- end Info Icon -->

      <span>Public</span>

      <!-- Switch -->
      <lbk-switch [activated]="true"></lbk-switch>
      <!-- end Switch -->

      <div class="flex gap-2 items-center">
        <span>Private</span>
        <strong class="badge rounded-none badge-primary">PRO</strong>
      </div>
    </div>
  `,
})
export class PrivateSolutionInputComponent {
  constructor(private readonly _dialogService: DialogService) {}

  /**
   * - Show About Private Solution
   */
  showAboutPrivateSolution() {
    this._dialogService.open(AboutPrivateSolutionsComponent);
  }
}
