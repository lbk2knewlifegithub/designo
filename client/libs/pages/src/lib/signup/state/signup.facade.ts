import { Injectable } from '@angular/core';
import { AuthActions, AuthService, UserService } from '@lbk/auth';
import { CreateUserDTO } from '@lbk/dto';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSignUp from './signup.selectors';

@Injectable({ providedIn: 'root' })
export class SignUpFacade {
  pending$: Observable<boolean> = this._store.select(fromSignUp.selectPending);

  error$: Observable<string> = this._store.select(fromSignUp.selectError);

  constructor(
    private readonly _store: Store,
    private readonly _userService: UserService,
    private readonly _authService: AuthService
  ) {}

  signUp(createUserDTO: CreateUserDTO, avatar?: File) {
    this._authService.uploadFile = avatar;
    this._store.dispatch(AuthActions.signup({ createUserDTO }));
  }

  isUsernameUnique(username: string): Observable<boolean> {
    return this._userService.usernameExists(username);
  }
}
