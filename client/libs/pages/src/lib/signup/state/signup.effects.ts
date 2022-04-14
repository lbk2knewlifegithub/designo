import { Injectable } from '@angular/core';
import { AuthService } from '@lbk/auth';
import { Actions } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class SignUpEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService
  ) {}
}
