import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

/**
 * - Profile Effects
 */
@Injectable({ providedIn: 'root' })
export class ProfileEffects {
  // /**
  //  * - Auto Close Sidebar When Navigate
  //  */
  // autoCloseOverlay$ = createEffect(
  //   () =>
  //     this._actions$.pipe(
  //       ofType(routerNavigatedAction),
  //       tap(() => this._facade.closeSidebar())
  //     ),
  //   {
  //     dispatch: false,
  //   }
  // );

  constructor(private readonly _actions$: Actions) {}
}
