import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbacksApiActions } from '@lbk/state/feedbacks';
import { DialogService } from '@ngneat/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { take, tap } from 'rxjs';

/**
 * - Edit Feedback Page Effects
 */
@Injectable({ providedIn: 'root' })
export class EditFeedbackPageEffects {
  /**
   * - Delete Feedback Success
   */
  deleteFeedbackSucess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FeedbacksApiActions.deleteFeedbackSuccess),
        tap(() => {
          this._dialogService
            .success('Delete feedback successfully')
            .afterClosed$.pipe(take(1))
            .subscribe(() => {
              this._router.navigateByUrl('/');
            });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _dialogService: DialogService
  ) {}
}
