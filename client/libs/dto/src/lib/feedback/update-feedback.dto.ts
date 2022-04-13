import { FeedbackCategory, FeedbackStatus } from '@lbk/models';

export interface UpdateFeedbackDTO {
  feedback_id: number;
  title: string;
  category: FeedbackCategory;
  status: FeedbackStatus;
  description: string;
}
