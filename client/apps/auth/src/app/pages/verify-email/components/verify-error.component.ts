import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-verify-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-4xl text-center">
      Verified Email failed. <br />Email expired, or not exists.
    </h1>

    <a href="http://localhost:4200" class="btn btn-primary"
      >Products Feedbacks
    </a>
  `,
  styles: [
    `
      :host {
        @apply flex items-center flex-col gap-10;
      }
    `,
  ],
})
export class VerifyErrorComponent {}
