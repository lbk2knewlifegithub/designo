import { Injectable } from '@angular/core';
import { Credentials } from '@lbk/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginError } from './login.reducer';
import { LoginPageActions } from './actions';
import * as fromLogin from './login.selectors';

@Injectable({ providedIn: 'root' })
export class LoginFacade {
  pending$: Observable<boolean> = this._store.select(fromLogin.selectPending);
  error$: Observable<LoginError | null> = this._store.select(
    fromLogin.selectError
  );

  constructor(private readonly _store: Store) {}

  login(credentials: Credentials) {
    this._store.dispatch(LoginPageActions.login({ credentials }));
  }
}
