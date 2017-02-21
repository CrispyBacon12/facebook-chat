import { APPROVE_COMMENT } from '../actions';

export function ApprovedCommentsReducer(state = [], action) {
  switch(action.type) {
    case APPROVE_COMMENT: return approveComment(state, action)
  }

  return state;
}

function approveComment(state, action) {
  // we want to merge with the existing state, excluding any comments that are being overriden
  // by this new payload, to avoid duplicates.
  const stateDifference = state.filter(comment => comment.id !== action.payload.id);
  return [...stateDifference, action.payload]
  .sort((a, b) => {
    return (a.created_time < b.created_time) ? 1 : (a.created_time > b.created_time) ? -1 : 0;
  });
}