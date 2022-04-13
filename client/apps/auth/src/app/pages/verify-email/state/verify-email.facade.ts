import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromVerifyEmail from './verify-email.selectors';

@Injectable({ providedIn: 'root' })
export class VerifyEmailFacade {
  loading$: Observable<boolean> = this._store.select(
    fromVerifyEmail.selectLoading
  );
  error$: Observable<string> = this._store.select(fromVerifyEmail.selectError);

  constructor(private readonly _store: Store) {}
}
