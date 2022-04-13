import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbacksApiActions } from '@lbk/state/feedbacks';
import { DialogService } from '@ngneat/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { take, tap } from 'rxjs';

/**
 * - Create Feedbacks Page Effects
 */
@Injectable({ providedIn: 'root' })
export class CreateFeedbackEffects {
  /**
   * - Create Feedback Success
   */
  createFeedbackSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FeedbacksApiActions.createFeedbackSuccess),
        tap(({ feedback: { feedback_id } }) => {
          this._dialogService
            .success('Feedback created successfully')
            .afterClosed$.pipe(take(1))
            .subscribe(() => {
              this._router.navigate(['/feedback', feedback_id]);
            });
        })
      ),
    { dispatch: false }
  );

  /**
   * - Create Feedback Failure
   */
  createFeedbackFailure$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(FeedbacksApiActions.createFeedbackFailure),
        tap(() => {
          this._dialogService.error(
            'Something went wrong. Please try again later'
          );
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
