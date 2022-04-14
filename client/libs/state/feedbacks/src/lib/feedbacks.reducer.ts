import { Comment, Feedback } from '@lbk/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { FeedbacksActions, FeedbacksApiActions } from './actions';
import { findCommentIndex } from './feedbacks.helper';

export const feedbacksFeatureKey = 'feedbacks';

export interface State extends EntityState<Feedback> {
  loaded: boolean;
  selectedFeedbackId: number | null;
}

export const adapter: EntityAdapter<Feedback> = createEntityAdapter<Feedback>({
  selectId: (feedback: Feedback) => feedback.feedback_id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedFeedbackId: null,
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  /**
   * - Reset
   * - Remove all feedbacks and set loaded to false
   */
  on(FeedbacksActions.reset, (state) =>
    adapter.removeAll({ ...state, loaded: false })
  ),

  /**
   * - Load Feedbacks Success
   */
  on(FeedbacksApiActions.loadFeedbacksSuccess, (state, { feedbacks }) =>
    adapter.addMany(feedbacks, { ...state, loaded: true })
  ),

  /**
   * - Load Feedbacks Failure
   */
  on(FeedbacksApiActions.loadFeedbacksFailure, (state) => ({
    ...state,
    loaded: false,
  })),

  /**
   * - Add feedback Success
   * - Load Single Feedback
   */
  on(
    FeedbacksApiActions.createFeedbackSuccess,
    FeedbacksApiActions.loadSingleFeedback,
    (state, { feedback }) => adapter.addOne(feedback, { ...state })
  ),

  /**
   * - Add feedback Failure
   */
  on(FeedbacksApiActions.createFeedbackFailure, (state) => ({
    ...state,
  })),

  /**
   * - Select Feedback
   */
  on(FeedbacksActions.selectFeedback, (state, { feedback_id: id }) => ({
    ...state,
    selectedFeedbackId: id,
  })),

  /**
   * - Upvote Success
   */
  on(FeedbacksApiActions.upvoteSuccess, (state, { feedback_id }) => {
    const feedback = state.entities[feedback_id];
    if (!feedback) return state;

    return adapter.updateOne(
      {
        id: feedback_id,
        changes: { upvotes: feedback.upvotes + 1, upvoted: true },
      },
      state
    );
  }),

  /**
   * - Downvote Success
   */
  on(FeedbacksApiActions.downvoteSuccess, (state, { feedback_id }) => {
    const feedback = state.entities[feedback_id];
    if (!feedback) return state;

    return adapter.updateOne(
      {
        id: feedback_id,
        changes: { upvotes: Math.max(feedback.upvotes - 1, 0), upvoted: false },
      },
      state
    );
  }),

  /**
   * - Delete feedback Success
   */
  on(FeedbacksApiActions.deleteFeedbackSuccess, (state, { feedback_id }) =>
    adapter.removeOne(feedback_id, state)
  ),

  /**
   * - Add comment Success
   */
  on(
    FeedbacksApiActions.addCommentSuccess,
    (state, { feedback_id, comment }) => {
      const feedback = state.entities[feedback_id];

      if (!feedback) return state;

      /**
       * - If parent_id of comment not exists will add comment to last comments
       */
      if (!comment.parent_id) {
        return adapter.updateOne(
          {
            id: feedback_id,
            changes: {
              comments: [...(feedback.comments || []), comment],
              commentsLength: feedback.commentsLength + 1,
            },
          },
          state
        );
      }

      return adapter.updateOne(
        {
          id: feedback_id,
          changes: {
            commentsLength: feedback.commentsLength + 1,
            comments: (feedback.comments as Comment[]).map((parent) => {
              // Check first level
              if (parent.comment_id === comment.parent_id) {
                return {
                  ...parent,
                  replies: [...(parent.replies || []), comment],
                };
              }

              return parent;
            }),
          },
        },
        state
      );
    }
  ),
  /**
   * - Load Comments Success
   */
  on(
    FeedbacksApiActions.loadCommentsSucess,
    (state, { feedback_id, comments }) => {
      const feedback = state.entities[feedback_id];
      if (!feedback) return state;

      return adapter.updateOne(
        {
          id: feedback_id,
          changes: {
            loadedComments: true,
            comments,
          },
        },
        state
      );
    }
  ),
  /**
   * - Delete Comment Success
   */
  on(
    FeedbacksApiActions.deleteCommentsSucess,
    (state, { comment_id, feedback_id }) => {
      const feedback = state.entities[feedback_id];
      if (!feedback || !feedback.comments) return state;

      const { baseIndex, childIndex } = findCommentIndex(
        feedback.comments,
        comment_id
      );

      // Delete in base level comment
      if (baseIndex !== undefined && childIndex === undefined) {
        return adapter.updateOne(
          {
            id: feedback_id,
            changes: {
              comments: feedback.comments.filter(
                (c, index) => index !== baseIndex
              ),
            },
          },
          state
        );
      }

      // Delete in replies level comment
      if (baseIndex !== undefined && childIndex !== undefined) {
        return adapter.updateOne(
          {
            id: feedback_id,
            changes: {
              comments: feedback.comments.map((c, index) =>
                index === baseIndex && c.replies
                  ? {
                      ...c,
                      replies: c.replies.filter(
                        (_, index) => index !== childIndex
                      ),
                    }
                  : c
              ),
            },
          },
          state
        );
      }

      return state;
    }
  ),

  /**
   * - Update Comment Success
   */
  on(
    FeedbacksApiActions.updateCommentSuccess,
    (state, { updateCommentDTO: { feedback_id, comment_id, content } }) => {
      const feedback = state.entities[feedback_id];
      if (!feedback || !feedback.comments) return state;

      const { baseIndex, childIndex } = findCommentIndex(
        feedback.comments,
        comment_id
      );

      // Check in base level comment
      if (baseIndex !== undefined && childIndex === undefined) {
        return adapter.updateOne(
          {
            id: feedback_id,
            changes: {
              comments: feedback.comments.map((c, index) =>
                index === baseIndex ? { ...c, content } : c
              ),
            },
          },
          state
        );
      }

      // Check in replies level comment
      if (baseIndex !== undefined && childIndex !== undefined) {
        return adapter.updateOne(
          {
            id: feedback_id,
            changes: {
              comments: feedback.comments.map((c, index) =>
                index === baseIndex && c.replies
                  ? {
                      ...c,
                      replies: c.replies.map((r, index) =>
                        index === childIndex ? { ...r, content } : r
                      ),
                    }
                  : c
              ),
            },
          },
          state
        );
      }

      return state;
    }
  ),
  /**
   * - Update Feedback Success
   */
  on(
    FeedbacksApiActions.updateFeedbackSuccess,
    (state, { updateFeedbackDTO }) => {
      const { feedback_id, category, description, status, title } =
        updateFeedbackDTO;
      const feedback = state.entities[feedback_id];
      if (!feedback) return state;

      return adapter.updateOne(
        {
          id: feedback_id,
          changes: {
            category,
            description,
            status,
            title,
          },
        },
        state
      );
    }
  )
);

// Gets
export const getId = (state: State) => state.selectedFeedbackId;
export const getLoaded = (state: State) => state.loaded;
