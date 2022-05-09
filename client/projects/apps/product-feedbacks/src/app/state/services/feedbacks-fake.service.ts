import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddCommentDTO,
  Comment,
  CreateFeedbackDTO,
  Feedback,
  UpdateCommentDTO,
  UpdateFeedbackDTO,
} from '../../shared';
import { FeedbacksService } from './feedbacks.service';

/**
 * - Feedbacks Fake Service
 */
@Injectable({ providedIn: 'root' })
export class FeedbacksFakeService implements FeedbacksService {
  getFeedbacks(): Observable<Feedback[]> {
    throw new Error('Method not implemented.');
  }
  retrieveFeedback(feedback_id: number): Observable<Feedback> {
    throw new Error('Method not implemented.');
  }
  upvoteFeedback(feedback_id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
  createFeedback(createFeedbackDTO: CreateFeedbackDTO): Observable<Feedback> {
    throw new Error('Method not implemented.');
  }
  deleteFeedback(feedback_id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
  addComment(
    feedback_id: number,
    addCommentDTO: AddCommentDTO
  ): Observable<Comment> {
    throw new Error('Method not implemented.');
  }
  downvote(feedback_id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
  updateFeedback(updateFeedbackDTO: UpdateFeedbackDTO): Observable<void> {
    throw new Error('Method not implemented.');
  }
  loadComments(feedback_id: number): Observable<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(comment_id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
  updateComment(updateCommentDTO: UpdateCommentDTO): Observable<void> {
    throw new Error('Method not implemented.');
  }

  //   getFeedbacks(): Observable<Feedback[]> {
  //     // return of(this.feedbacks).pipe(delay(1000));
  //     return of(this.feedbacks);
  //     // return of([]);
  //   }

  //   retrieveFeedback(id: number): Observable<Feedback> {
  //     const feedback = this.feedbacks.find(
  //       (feedback) => feedback.feedback_id === parseInt(id + '')
  //     );
  //     if (!feedback) return throwError(() => 'Not found');
  //     return of(feedback);
  //   }

  //   upvoteFeedback(id: number): Observable<void> {
  //     throw new Error('Method not implemented.');
  //   }

  //   createFeedback(createFeedbackDTO: CreateFeedbackDTO): Observable<Feedback> {
  //     throw new Error('Method not implemented.');
  //   }

  //   deleteFeedback(feedback_id: number): Observable<void> {
  //     throw new Error('Method not implemented.');
  //   }

  //   addComment(
  //     feedback_id: number,
  //     addCommentDTO: AddCommentDTO
  //   ): Observable<Comment> {
  //     throw new Error('Method not implemented.');
  //   }
}
