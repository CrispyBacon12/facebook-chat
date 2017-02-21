import { ADD_COMMENTS } from '../actions';

export function CommentsReducer(state = [], action) {
  switch(action.type) {
    case ADD_COMMENTS: return addComments(state, action)
  }

  return state;
}

function addComments(state, action) {
  // we want to merge with the existing state, excluding any comments that are being overriden
  // by this new payload, to avoid duplicates.
  const stateDifference = state.filter(comment => !action.payload.some(value => value.id === comment.id));
  return [...stateDifference, ...action.payload]
  .sort((a, b) => {
    return (a.created_time < b.created_time) ? 1 : (a.created_time > b.created_time) ? -1 : 0;
  });
}
