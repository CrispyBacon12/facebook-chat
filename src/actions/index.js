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