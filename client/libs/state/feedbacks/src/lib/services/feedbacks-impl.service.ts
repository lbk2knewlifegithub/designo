import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  AddCommentDTO,
  CreateFeedbackDTO,
  UpdateCommentDTO,
  UpdateFeedbackDTO,
} from '@lbk/dto';
import { Comment, Feedback } from '@lbk/models';
import { delay, Observable, shareReplay } from 'rxjs';
import { API_PRODUCT_FEEDBACKS_URL } from '@lbk/tokens';
import { FeedbacksService } from './feedbacks.service';

/**
 * - Feedbacks Fake Service
 */
@Injectable({ providedIn: 'root' })
export class FeedbacksImplService implements FeedbacksService {
  constructor(
    @Inject(API_PRODUCT_FEEDBACKS_URL)
    private readonly _apiFeedbacksUrl: string,
    private readonly _http: HttpClient
  ) {}

  /**
   * - Get Feedbacks
   */
  getFeedbacks(): Observable<Feedback[]> {
    return this._http
      .get<Feedback[]>(`${this._apiFeedbacksUrl}`)
      .pipe(shareReplay(1));
  }

  /**
   *  - Retrive Feedback
   * @param feedback_id
   * @returns
   */
  retrieveFeedback(feedback_id: number): Observable<Feedback> {
    return this._http
      .get<Feedback>(`${this._apiFeedbacksUrl}/feedback/${feedback_id}`)
      .pipe(shareReplay(1));
  }

  /**
   *  - Upvote Feedback
   * @param feedback_id
   * @returns
   */
  upvoteFeedback(feedback_id: number): Observable<void> {
    return this._http
      .patch<void>(
        `${this._apiFeedbacksUrl}/feedback/${feedback_id}/upvote`,
        null
      )
      .pipe(shareReplay(1));
  }

  /**
   * - Downvote feedback
   * @param feedback_id
   */
  downvote(feedback_id: number): Observable<void> {
    return this._http
      .patch<void>(
        `${this._apiFeedbacksUrl}/feedback/${feedback_id}/downvote`,
        null
      )
      .pipe(shareReplay(1));
  }

  /**
   *  - Create Feedback
   * @param createFeedbackDTO
   * @returns
   */
  createFeedback(createFeedbackDTO: CreateFeedbackDTO): Observable<Feedback> {
    return this._http
      .post<Feedback>(`${this._apiFeedbacksUrl}`, createFeedbackDTO)
      .pipe(shareReplay(1));
  }

  /**
   *  - Delete Feedback
   * @param feedback_id
   * @returns
   */
  deleteFeedback(feedback_id: number): Observable<void> {
    return this._http
      .delete<void>(`${this._apiFeedbacksUrl}/feedback/${feedback_id}`)
      .pipe(shareReplay(1));
  }

  /**
   *  - Update Feedback
   * @param updateFeedbackDTO
   */
  updateFeedback({
    feedback_id,
    title,
    category,
    description,
    status,
  }: UpdateFeedbackDTO): Observable<void> {
    return this._http
      .put<void>(`${this._apiFeedbacksUrl}/feedback/${feedback_id}`, {
        title,
        category,
        description,
        status,
      })
      .pipe(shareReplay(1));
  }

  /**
   *  - Add Comment
   * @param feedback_id
   * @param addCommentDTO
   * @returns
   */
  addComment(
    feedback_id: number,
    addCommentDTO: AddCommentDTO
  ): Observable<Comment> {
    return this._http
      .post<Comment>(
        `${this._apiFeedbacksUrl}/comments/${feedback_id}/feedback`,
        addCommentDTO
      )
      .pipe(shareReplay(1));
  }

  /**
   *  - Load Comments
   * @param feedback_id
   * @returns
   */
  loadComments(feedback_id: number): Observable<Comment[]> {
    return this._http
      .get<Comment[]>(
        `${this._apiFeedbacksUrl}/comments/${feedback_id}/feedback`
      )
      .pipe(shareReplay(1));
  }

  /**
   *  - Delete Comment
   * @param comment_id
   * @returns
   */
  deleteComment(comment_id: number): Observable<void> {
    return this._http
      .delete<void>(`${this._apiFeedbacksUrl}/comments/${comment_id}`)
      .pipe(shareReplay(1));
  }

  /**
   *  - Update Comment
   * @param param0
   * @returns
   */
  updateComment({ comment_id, content }: UpdateCommentDTO): Observable<void> {
    return this._http
      .put<void>(`${this._apiFeedbacksUrl}/comments/${comment_id}`, {
        content,
      })
      .pipe(shareReplay(1));
  }
}
