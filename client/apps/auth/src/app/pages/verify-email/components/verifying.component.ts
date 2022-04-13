import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-verifying',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold">Verifying your email</h1>
      <lbk-spinner class="mt-10" [radius]="60" [loading]="true">
        <button>Verified your email</button>
      </lbk-spinner>
    </div>
  `,
})
export class VerifyingComponent {}
