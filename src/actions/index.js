import facebookConnector from '../services/facebook';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    payload: comments
  };
}

export const APPROVE_COMMENT = 'APPROVE_COMMENT';
export function approveComment(comment) {
  return {
    type: APPROVE_COMMENT,
    payload: comment
  }
}

export const DISAPPROVE_COMMENT = 'DISAPPROVE_COMMENT';
export function disapproveComment(comment) {
  return {
    type: DISAPPROVE_COMMENT,
    payload: comment
  }
}

export function toggleCommentApproval(comment, approvedComments, cb) {
  const commentIsApproved = approvedComments.some(approvedComment => approvedComment.id === comment.id);

  cb(commentIsApproved);

  if (commentIsApproved) {
    return disapproveComment(comment);
  }

  return approveComment(comment);
}
