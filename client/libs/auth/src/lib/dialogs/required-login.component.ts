import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'lbk-required-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8">
      <div class="flex justify-center">
        <img
          class="max-w-xs"
          src="assets/required-login.svg"
          alt="Required Login"
        />
      </div>
      <div class="flex justify-end gap-4 font-bold mt-8">
        <!-- Login Button -->
        <a
          routerLink="/login"
          [queryParams]="queryParams"
          (click)="close()"
          class="duration-100 bg-sky-500 rounded-lg text-white px-6 py-3 hover:bg-sky-600"
          >Login</a
        >
        <!-- end Login Button -->

        <!-- Signup Button -->
        <a
          routerLink="signup"
          [queryParams]="queryParams"
          (click)="close()"
          class="duration-100 bg-orange-400 rounded-lg text-white px-6 py-3 hover:bg-sky-600"
        >
          SignUp
        </a>
        <!-- end Signup Button -->
      </div>
    </div>
  `,
})
export class RequiredLoginComponent {
  constructor(
    private readonly _ref: DialogRef,
    private readonly _router: Router
  ) {}

  close() {
    this._ref.close();
  }

  get queryParams() {
    const returnUrl = this._router.url;
    return returnUrl ? { returnUrl } : {};
  }
}
