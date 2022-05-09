import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-want-screenshot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-4 md:flex-row md:justify-between">
      <div class="md:text-left">
        <h3 class="text-2xl font-medium">Want a new screenshot?</h3>
        <span class="text-xs text-secondary"
          >You have 5 screenshots left this month</span
        >
      </div>

      <!-- Generate Screenshot Button -->
      <div>
        <button
          (click)="generateScreenShot()"
          class="btn italic font-bold btn-error w-full md:w-auto md:px-10"
        >
          GENERATE SCREENSHOT
        </button>
      </div>
      <!-- end Generate Screenshot Button -->
    </div>

    <div class="mt-2 sm:flex sm:justify-center sm:mt-4">
      <p class="bg-secondary-50 p-4 text-sm sm:rounded-lg md:w-full md:py-3">
        Get unlimited screenshots as a
        <span class="badge badge-primary rounded">PRO</span> member
      </p>
    </div>
  `,
  styles: [
    `
      :host {
        @apply block bg-white border rounded-xl text-center py-8 px-6;
      }
    `,
  ],
})
export class WantScreenshotComponent {
  /**
   * - Generate Screenshot
   */
  generateScreenShot() {
    throw new Error('Not implemented yet');
  }
}
