import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { zoomIn } from '@lbk/anims';
import { AuthError, AuthFacade } from '@lbk/auth';
import { CreateUserDTO } from '@lbk/dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-signup-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Wallpaper Mobile  -->
    <img
      class="md:hidden fixed inset-0 w-full h-full"
      src="assets/signup/bg-mobile.jpg"
      alt="Wallpepr Mobile"
    />
    <!-- end Wallpaper Mobile  -->

    <!-- Wallpaper Desktop -->
    <img
      class="hidden md:block fixed inset-0 w-full h-full"
      src="assets/signup/bg-desktop.jpg"
      alt="Wallpepr Desktop"
    />
    <!-- end Wallpaper Desktop -->

    <main class="mt-32 lg:mt-0 lg:h-screen grid place-content-center ">
      <div @zoomIn class="container ">
        <lbk-signup-form
          [pending]="(pending$ | async)!"
          [error]="(error$ | async)!"
          (signup)="signup($event)!"
        >
        </lbk-signup-form>
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
export class SignupPageComponent implements OnInit {
  pending$!: Observable<boolean>;
  error$!: Observable<AuthError | null>;

  constructor(private readonly _authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.pending$ = this._authFacade.pending$;
    this.error$ = this._authFacade.error$;
  }

  signup(payload: { createUserDTO: CreateUserDTO; avatar?: File }) {
    const { createUserDTO, avatar } = payload;
    this._authFacade.signUp(createUserDTO, avatar);
  }
}
