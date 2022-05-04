import { FeedbackSummary } from '../../../shared';

export interface Roadmap extends Pick<FeedbackSummary, 'color' | 'status'> {
  numberOfFeedbacks: number;
}
export const createRoadmap = ({
  color,
  status,
  feedbacks,
}: FeedbackSummary): Roadmap => ({
  color,
  status,
  numberOfFeedbacks: feedbacks.length,
});
