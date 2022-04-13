import { AuthService, UserService } from '@lbk/state/auth';
import { Injectable } from '@angular/core';
import { CreateUserDTO } from '@lbk/dto';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as SignUpPageActions from './actions/signup-page.actions';
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
    this._store.dispatch(SignUpPageActions.signUp({ createUserDTO }));
  }

  isUsernameUnique(username: string): Observable<boolean> {
    return this._userService.usernameExists(username);
  }
}
