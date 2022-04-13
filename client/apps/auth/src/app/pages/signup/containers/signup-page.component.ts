import { CreateUserDTO } from '@lbk/dto';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { zoomIn } from '@lbk/anims';
import { Observable } from 'rxjs';
import { SignUpFacade } from './../state';

@Component({
  selector: 'lbk-signup-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Wallpaper Mobile  -->
    <img
      class="md:hidden bg"
      src="assets/signup/bg-mobile.jpg"
      alt="Wallpepr Mobile"
    />
    <!-- end Wallpaper Mobile  -->

    <!-- Wallpaper Desktop -->
    <img
      class="hidden md:block bg"
      src="assets/signup/bg-desktop.jpg"
      alt="Wallpepr Desktop"
    />
    <!-- end Wallpaper Desktop -->

    <main class="mt-32 lg:mt-0 lg:h-screen grid place-content-center ">
      <div @zoomIn class="container ">
        <lbk-signup-form
          [pending]="(pending$ | async)!"
          [error]="(error$ | async)!"
        >
        </lbk-signup-form>
      </div>
    </main>

    <!-- Loading -->
    <lbk-auth-loading [shown]="(pending$ | async)!"></lbk-auth-loading>
    <!-- end Loading -->
  `,
  animations: [zoomIn()],
})
export class SignupPageComponent implements OnInit {
  pending$!: Observable<boolean>;
  error$!: Observable<string>;

  constructor(private readonly _facade: SignUpFacade) {}

  ngOnInit(): void {
    this.pending$ = this._facade.pending$;
    this.error$ = this._facade.error$;
  }

  createUser(createUserDTO: CreateUserDTO) {
    this._facade.signUp(createUserDTO);
  }
}
