import facebookConnector from '../services/facebook';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    payload: comments
  };
}