import { Inject, Injectable } from '@angular/core';
import { AuthApiActions } from '@lbk/auth';
import { FeedbacksFacade } from './feedbacks.facade';
import { DialogService } from '@ngneat/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { FeedbacksActions, FeedbacksApiActions } from './actions';
import { FEEDBACKS_SERVICE } from './tokens/feedbacks.token';
import { FeedbacksService } from './services';

/**
 * - Feedback Effects
 */
@Injectable({ providedIn: 'root' })
export class FeedbackEffects {
  /**
   * - Logout
   * - When user logout will remove all feedbacks and load again
   */
  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.logoutSuccess),
        tap(() => {
          this._feedbacksFacade.reset();
        })
      ),
    {
      dispatch: false,
    }
  );

  /**
   * - Load Feedbacks
   */
  loadFeedbacks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.loadFeedBacks),
      exhaustMap(() =>
        this._feedBacksService.getFeedbacks().pipe(
          /**
           * - Load Feedbacks Success
           */
          map((feedbacks) =>
            FeedbacksApiActions.loadFeedbacksSuccess({ feedbacks })
          ),
          /**
           * - Load Feedbacks Failure
           */
          catchError((error) =>
            of(FeedbacksApiActions.loadFeedbacksFailure(error))
          )
        )
      )
    )
  );

  /**
   * - Upvote Feedback
   */
  upvoteFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.upvote),
      exhaustMap(({ feedback_id }) =>
        this._feedBacksService.upvoteFeedback(feedback_id).pipe(
          /**
           * - Upvote Feedback Success
           */
          map(() => FeedbacksApiActions.upvoteSuccess({ feedback_id })),
          /**
           * - Upvote Feedback Failure
           */
          catchError(({ error }) =>
            of(FeedbacksApiActions.upvoteFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * - Downvote Feedback
   */
  downvoteFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.downvote),
      exhaustMap(({ feedback_id }) =>
        this._feedBacksService.downvote(feedback_id).pipe(
          /**
           * - Downvote Feedback Success
           */
          map(() => FeedbacksApiActions.downvoteSuccess({ feedback_id })),
          /**
           * - Downvote Feedback Failure
           */
          catchError(({ error }) =>
            of(FeedbacksApiActions.downvoteFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * - Create Feedback
   */
  createFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.createFeedback),
      exhaustMap(({ createFeedbackDTO }) =>
        this._feedBacksService.createFeedback(createFeedbackDTO).pipe(
          /**
           * - Create Feedback Success
           */
          map((feedback) =>
            FeedbacksApiActions.createFeedbackSuccess({ feedback })
          ),
          /**
           * - Create Feedback Failure
           */
          catchError((error) =>
            of(FeedbacksApiActions.createFeedbackFailure(error))
          )
        )
      )
    )
  );

  /**
   * - Delete Feedback
   */
  deleteFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.deleteFeedback),
      exhaustMap(({ feedback_id }) =>
        this._feedBacksService.deleteFeedback(feedback_id).pipe(
          /**
           * - Delete Feedback Success
           */
          map(() => FeedbacksApiActions.deleteFeedbackSuccess({ feedback_id })),
          /**
           * - Delete Feedback Failure
           */
          catchError((error) =>
            of(FeedbacksApiActions.deleteFeedbackFailure(error))
          )
        )
      )
    )
  );

  /**
   * - Add comment
   */
  addComment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.addComment),
      exhaustMap(({ feedback_id, addCommentDTO }) =>
        this._feedBacksService.addComment(feedback_id, addCommentDTO).pipe(
          /**
           * - Add Comment  Success
           */
          map((comment) =>
            FeedbacksApiActions.addCommentSuccess({
              feedback_id,
              comment,
            })
          )
        )
      ),
      /**
       * - Add Comment Failure
       */
      catchError((error) => of(FeedbacksApiActions.addCommentFailure(error)))
    )
  );

  /**
   * - Load Comments
   */
  loadComments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.loadComments),
      exhaustMap(({ feedback_id }) =>
        this._feedBacksService.loadComments(feedback_id).pipe(
          /**
           * - Load  Comments  Success
           */
          map((comments) =>
            FeedbacksApiActions.loadCommentsSucess({
              feedback_id,
              comments,
            })
          )
        )
      ),
      /**
       * - Load Comment Failure
       */
      catchError((error) => of(FeedbacksApiActions.loadCommentsFailure(error)))
    )
  );

  /**
   * - Delete Comment
   */
  deleteComment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.deleteComment),
      exhaustMap(({ comment_id, feedback_id }) =>
        this._feedBacksService.deleteComment(comment_id).pipe(
          /**
           * - Delete  Comments  Success
           */
          map(() =>
            FeedbacksApiActions.deleteCommentsSucess({
              comment_id,
              feedback_id,
            })
          ),
          /**
           * - Delete Comment Failure
           */
          catchError((error) =>
            of(FeedbacksApiActions.deleteCommentsFailure(error))
          )
        )
      )
    )
  );

  /**
   * - Update Comment
   */
  updateComment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.updateComment),
      exhaustMap(({ updateCommentDTO }) =>
        this._feedBacksService.updateComment(updateCommentDTO).pipe(
          /**
           * - Update Comment Success
           */
          map(() =>
            FeedbacksApiActions.updateCommentSuccess({ updateCommentDTO })
          ),
          /**
           * - Delete Comment Failure
           */
          catchError((error) =>
            of(FeedbacksApiActions.updateCommentFailure(error))
          )
        )
      )
    )
  );

  /**
   * - Update Feedback
   */
  updateFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeedbacksActions.updateFeedback),
      exhaustMap(({ updateFeedbackDTO }) =>
        this._feedBacksService.updateFeedback(updateFeedbackDTO).pipe(
          tap(() => this._dialogService.success('Feedback updated')),
          /**
           * - Update Feedback Success
           */
          map(() =>
            FeedbacksApiActions.updateFeedbackSuccess({ updateFeedbackDTO })
          ),
          /**
           * - Udpate Feedback Failure
           */
          catchError((error) =>
            of(FeedbacksApiActions.updateCommentFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(FEEDBACKS_SERVICE)
    private readonly _feedBacksService: FeedbacksService,
    private readonly _dialogService: DialogService,
    private readonly _feedbacksFacade: FeedbacksFacade
  ) {}
}
