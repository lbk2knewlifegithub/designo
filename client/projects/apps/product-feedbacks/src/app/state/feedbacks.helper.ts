import { Comment } from '../shared';

export function findCommentIndex(
  comments: Comment[],
  comment_id: number
): {
  baseIndex?: number;
  childIndex?: number;
} {
  const position: {
    baseIndex?: number;
    childIndex?: number;
  } = {};

  for (let i = 0; i < comments.length; i++) {
    const commentBase = comments[i];

    // Check in base level comments
    if (commentBase.comment_id === comment_id) {
      position.baseIndex = i;
      break;
    }

    // check in replies
    if (!commentBase.replies) continue;
    for (let j = 0; j < commentBase.replies.length; j++) {
      const reply = commentBase.replies[j];
      if (reply.comment_id === comment_id) {
        position.baseIndex = i;
        position.childIndex = j;
        break;
      }
    }
  }

  return position;
}
