import { Observable } from 'rxjs';
import {
  AddCommentDTO,
  Comment,
  CreateFeedbackDTO,
  Feedback,
  UpdateCommentDTO,
  UpdateFeedbackDTO,
} from '../../shared';

/**
 * - Feedbacks Service
 */
export interface FeedbacksService {
  /**
   * - Get Feedbacks
   */
  getFeedbacks(): Observable<Feedback[]>;

  /**
   * - Retrieve Feedback
   */
  retrieveFeedback(feedback_id: number): Observable<Feedback>;

  /**
   * - Upvote feedback
   */
  upvoteFeedback(feedback_id: number): Observable<void>;

  /**
   * - Upvote Feedback
   */
  downvote(feedback_id: number): Observable<void>;

  /**
   * - Create feedback
   */
  createFeedback(createFeedbackDTO: CreateFeedbackDTO): Observable<Feedback>;

  /**
   * - Delete feedback
   */
  deleteFeedback(feedback_id: number): Observable<void>;

  /**
   *  - Update Feedback
   */
  updateFeedback(updateFeedbackDTO: UpdateFeedbackDTO): Observable<void>;

  /**
   * - Add comment
   */
  addComment(
    feedback_id: number,
    addCommentDTO: AddCommentDTO
  ): Observable<Comment>;

  /**
   * - Load Comments
   */
  loadComments(feedback_id: number): Observable<Comment[]>;

  /**
   * - Delete Comment
   */
  deleteComment(comment_id: number): Observable<void>;

  /**
   * - Update Comment
   */
  updateComment(updateCommentDTO: UpdateCommentDTO): Observable<void>;
}
