import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-contact-form-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-flex gap-2 items-center text-white absolute right-0 top-1/2 -translate-y-1/2 bg-transparent"
    >
      <!-- Content -->
      <ng-content></ng-content>
      <!-- end Content -->

      <!-- Exlammation Icon -->
      <i class="fa-solid fa-circle-exclamation text-base"></i>
      <!-- end Exlammation Icon -->
    </span>
  `,
})
export class ContactFormErrorComponent {}
