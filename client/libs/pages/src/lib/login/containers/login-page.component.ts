import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { zoomIn } from '@lbk/anims';
import { Credentials } from '@lbk/models';
import { Observable } from 'rxjs';
import { LoginFacade } from '../state/login.facade';
import { LoginError } from './../state/login.reducer';

@Component({
  selector: 'lbk-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Wallpaper Mobile -->
    <img
      class="sm:hidden fixed inset-0 w-full h-full"
      src="assets/login/bg-mobile.jpg"
      alt="Wallpepr Mobile"
    />
    <!-- end Wallpaper Mobile -->

    <!-- Wallpaper Desktop -->
    <img
      class="hidden sm:block fixed inset-0 w-full h-full"
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
    <lbk-open-the-door-loading
      [shown]="(pending$ | async)!"
    ></lbk-open-the-door-loading>
    <!-- end Loading -->
  `,
  animations: [zoomIn()],
})
export class LoginPageComponent implements OnInit {
  pending$!: Observable<boolean>;
  error$!: Observable<LoginError | null>;

  constructor(private readonly _loginFacade: LoginFacade) {}

  ngOnInit(): void {
    this.pending$ = this._loginFacade.pending$;
    this.error$ = this._loginFacade.error$;

    this.error$.subscribe(console.log);
  }

  login(credentials: Credentials) {
    this._loginFacade.login(credentials);
  }
}
