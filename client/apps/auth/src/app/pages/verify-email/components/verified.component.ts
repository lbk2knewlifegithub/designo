import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-verifed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <img src="assets/verify-success.gif" alt="Verify Success" />

      <div class="grid place-items-center mt-10">
        <h1 class="text-4xl">Your email verified :)</h1>
        <a href="http://localhost:4200" class="btn btn-primary mt-4"
          >Product Feedbacks</a
        >
      </div>
    </div>
  `,
})
export class VerifyedComponent {}
