import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthError, AuthFacade } from '@lbk/auth';
import { Credentials } from '@lbk/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'lbk-login-oauth-page',
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
export class LoginOauthPageComponent implements OnInit {
  error$!: Observable<AuthError | null>;

  constructor(private readonly _authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.error$ = this._authFacade.error$;
  }

  login(credentials: Credentials) {
    this._authFacade.login(credentials);
  }
}
