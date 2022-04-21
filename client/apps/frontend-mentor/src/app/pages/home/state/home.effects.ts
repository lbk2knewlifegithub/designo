import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HomeFacade } from './home.facade';

@Injectable({ providedIn: 'root' })
export class HomeEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _homeFacade: HomeFacade
  ) {}
}
