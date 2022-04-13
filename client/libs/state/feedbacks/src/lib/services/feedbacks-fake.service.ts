// import { Injectable } from '@angular/core';
// import { feedbacks as feedbacksData } from '@lbk/data';
// import { CreateFeedbackDTO, AddCommentDTO } from '@lbk/dto';
// import { Feedback, Comment } from '@lbk/models';
// import { Observable, of, throwError } from 'rxjs';
// import { FeedbacksService } from './feedbacks.service';

// /**
//  * - Feedbacks Fake Service
//  */
// @Injectable({ providedIn: 'root' })
// export class FeedbacksFakeService implements FeedbacksService {
//   feedbacks: Feedback[] = feedbacksData;

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
// }
