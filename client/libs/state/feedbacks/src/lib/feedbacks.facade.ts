import { Inject, Injectable } from '@angular/core';
import { AddCommentDTO, CreateFeedbackDTO, UpdateFeedbackDTO } from '@lbk/dto';
import {
  createSummaryFeedback,
  Feedback,
  FeedbackStatus,
  FeedbackSummary,
} from '@lbk/models';
import { AuthFacade } from '@lbk/state/auth';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { FeedbacksActions, FeedbacksApiActions } from './actions';
import * as fromFeedbacks from './feedbacks.selectors';
import { FEEDBACKS_SERVICE } from './feedbacks.token';
import { FeedbacksService } from './services/feedbacks.service';

/**
 * - Feedbacks Facade
 */
@Injectable({ providedIn: 'root' })
export class FeedbacksFacade {
  /**
   * - Select Feedback Selected
   */
  selectedFeedback$ = this._store.select(fromFeedbacks.selectSelectedFeedback);

  /**
   * - All Feedbacks
   */
  allFeedbacks$: Observable<Feedback[]> = this._store.select(
    fromFeedbacks.selectAllFeedbacks
  );

  /**
   * - Summaries
   */
  // summaries$: Observable<FeedbackSummary[]> = this.allFeedbacks$.pipe(
  //   first(),
  //   concatAll(),
  //   groupBy((f) => f.status),
  //   mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
  //   filter((array) => array[0] !== FeedbackStatus.SUGGESTION),
  //   map((array) => createSummaryFeedback(array[0], array[1])),
  //   toArray()
  // );
  summaries$: Observable<FeedbackSummary[]> = this.allFeedbacks$.pipe(
    map((feedbacks) => {
      return [
        // Planned
        createSummaryFeedback(FeedbackStatus.PLANNED, feedbacks),

        // In-Progress
        createSummaryFeedback(FeedbackStatus.IN_PROGRESS, feedbacks),

        // Live
        createSummaryFeedback(FeedbackStatus.LIVE, feedbacks),
      ];
    })
  );

  /**
   * - Loaded feedback
   */
  loaded$: Observable<boolean> = this._store.select(fromFeedbacks.selectLoaded);

  /**
   * - Constructor
   * @param _store
   * @param _feedBacksService
   */
  constructor(
    private readonly _store: Store,
    @Inject(FEEDBACKS_SERVICE)
    private readonly _feedBacksService: FeedbacksService,
    private readonly _authFacade: AuthFacade
  ) {}

  /**
   * - Has Feedback In Store
   * @param id
   */
  hasFeedbackInStore(id: number): Observable<boolean> {
    return this._store.select(fromFeedbacks.selectFeedbacksEntities).pipe(
      map((entities) => entities[id]),
      map((invoice) => !!invoice),
      take(1),
      tap((result) => {
        if (result) this.selectFeedback(id);
      })
    );
  }

  /**
   * - Has Feed Back In Api
   * @param id
   */
  hasFeedbackInApi(id: number): Observable<boolean> {
    return this._feedBacksService.retrieveFeedback(id).pipe(
      tap((feedback) => {
        if (feedback) {
          this._store.dispatch(
            FeedbacksApiActions.loadSingleFeedback({ feedback })
          );
          this.selectFeedback(feedback.feedback_id);
        }
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * - Select Feedback
   * @param id
   */
  selectFeedback(id: number | null) {
    this._store.dispatch(FeedbacksActions.selectFeedback({ feedback_id: id }));

    this.selectedFeedback$.pipe(take(1)).subscribe((feedback) => {
      if (!feedback || feedback.loadedComments || feedback.commentsLength == 0)
        return;

      const { feedback_id } = feedback;
      this._store.dispatch(FeedbacksActions.loadComments({ feedback_id }));
    });
  }

  createFeedback(createFeedbackDTO: CreateFeedbackDTO) {
    this._store.dispatch(
      FeedbacksActions.createFeedback({ createFeedbackDTO })
    );
  }

  /**
   * - Load Feed backs
   */
  loadAllFeedbacks() {
    this.loaded$.pipe(take(1)).subscribe((loaded) => {
      if (loaded) return;
      this._store.dispatch(FeedbacksActions.loadFeedBacks());
    });
  }

  /**
   * - Upvote Feedback By Id
   */
  upvote(feedback_id: number) {
    this._store.dispatch(FeedbacksActions.upvote({ feedback_id }));
  }

  /**
   * - Downvote Feedback By Id
   */
  downvote(feedback_id: number) {
    this._store.dispatch(FeedbacksActions.downvote({ feedback_id }));
  }

  /**
   * - Delete Feedback Selected
   */
  deleteFeedbackSelected() {
    this.selectedFeedback$.pipe(take(1)).subscribe((feedback) => {
      if (!feedback) return;
      const { feedback_id } = feedback;
      this._store.dispatch(FeedbacksActions.deleteFeedback({ feedback_id }));
    });
  }

  /**
   * - Add Comment
   * @param addCommentDTO
   */
  addComment(feedback_id: number, addCommentDTO: AddCommentDTO) {
    this._store.dispatch(
      FeedbacksActions.addComment({ feedback_id, addCommentDTO })
    );
  }

  /**
   * - Add Comment
   * @param addCommentDTO
   */
  addCommentSelectedFeedback(addCommentDTO: AddCommentDTO) {
    this.selectedFeedback$.pipe(take(1)).subscribe((feedback) => {
      if (!feedback) return;
      const { feedback_id } = feedback;
      this._store.dispatch(
        FeedbacksActions.addComment({ feedback_id, addCommentDTO })
      );
    });
  }

  /**
   * - Load Comments
   * @param addCommentDTO
   */
  loadComments(feedback_id: number) {
    this._store.dispatch(FeedbacksActions.loadComments({ feedback_id }));
  }

  /**
   * - Delete comments
   * @param comment_id
   */
  deleteComment(comment_id: number) {
    this.selectedFeedback$.pipe(take(1)).subscribe((feedback) => {
      if (!feedback) return;

      const { feedback_id } = feedback;
      this._store.dispatch(
        FeedbacksActions.deleteComment({ comment_id, feedback_id })
      );
    });
  }

  /**
   * - Update Comment
   * @param comment_id
   * @param content
   */
  updateComment(comment_id: number, content: string) {
    this.selectedFeedback$.pipe(take(1)).subscribe((feedback) => {
      if (!feedback) return;
      const { feedback_id } = feedback;
      this._store.dispatch(
        FeedbacksActions.updateComment({
          updateCommentDTO: { comment_id, content, feedback_id },
        })
      );
    });
  }

  /**
   * - Update Feedback
   */
  updateFeedback(updateFeedbackDTO: UpdateFeedbackDTO) {
    this._store.dispatch(
      FeedbacksActions.updateFeedback({ updateFeedbackDTO })
    );
  }

  /**
   * - Delete Feedback
   */
  deleteFeedback(feedback_id: number) {
    this._store.dispatch(FeedbacksActions.deleteFeedback({ feedback_id }));
  }
}