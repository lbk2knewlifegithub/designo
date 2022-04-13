import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { zoomIn } from '@lbk/anims';
import { Credentials } from '@lbk/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginPageActions } from '../state/actions';
import * as fromLogin from '../state/login.selectors';
import { LoginError } from './../state/login.reducer';

@Component({
  selector: 'lbk-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Wallpaper Mobile -->
    <img
      class="sm:hidden bg"
      src="assets/login/bg-mobile.jpg"
      alt="Wallpepr Mobile"
    />
    <!-- end Wallpaper Mobile -->

    <!-- Wallpaper Desktop -->
    <img
      class="hidden sm:block bg"
      src="assets/login/bg-desktop.jpg"
      alt="Wallpepr Desktop"
    />
    <!-- end Wallpaper Desktop -->

    <main class="mt-32 lg:mt-0 lg:h-screen grid place-content-center ">
      <div @zoomIn class="container ">
        <lbk-login-form
          class="sm:w-[500px]"
          (login)="login($event)"
          [pending]="(pending$ | async)!"
          [error]="error$ | async"
        >
        </lbk-login-form>
      </div>
    </main>

    <!-- Loading -->
    <lbk-auth-loading [shown]="(pending$ | async)!"></lbk-auth-loading>
    <!-- end Loading -->
  `,
  animations: [zoomIn()],
})
export class LoginPageComponent implements OnInit {
  pending$!: Observable<boolean>;
  error$!: Observable<LoginError | null>;

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.pending$ = this._store.select(fromLogin.selectPending);
    this.error$ = this._store.select(fromLogin.selectError);
  }

  login(credentials: Credentials) {
    this._store.dispatch(LoginPageActions.login({ credentials }));
  }
}
