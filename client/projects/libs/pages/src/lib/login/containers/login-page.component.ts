import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserFacade } from '@lbk/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      style="height: 100vh; display: grid; justify-items: center; place-content:center;"
    >
      <lbk-spinner [radius]="50" [loading]="true"></lbk-spinner>
      <h1 class="text-lg font-bold mt-4 text-center">Please wait</h1>
    </main>
  `,
})
export class LoginPageComponent implements OnInit {
  error$!: Observable<string | null>;

  constructor(private readonly _userFacade: UserFacade) {}

  ngOnInit(): void {
    this.error$ = this._userFacade.error$;
  }
}
